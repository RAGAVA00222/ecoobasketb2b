
"use strict";
(()=>{
const BASE="https://tgupsygjvnesdpdjwdbp.supabase.co", KEY="sb_publishable_2E0DufgeSs6W0Vn6t4bz0Q_bgGGHOpr", OWNER="ecoobasket@gmail.com";
let token=null, sessionUser=null, busy=false;
const $=id=>document.getElementById(id);
const hide=(id,v)=>$(id).classList.toggle("hidden",v);
const msg=(id,s)=>$(id).textContent=s;
const money=v=>new Intl.NumberFormat("en-IN",{style:"currency",currency:"INR",maximumFractionDigits:2}).format(v);
function clearMessages(){msg("status","");msg("error","");}
async function api(path,options={},jwt=null){
 const headers={"apikey":KEY,"content-type":"application/json", ...(jwt?{"Authorization":"Bearer "+jwt}:{})};
 const response=await fetch(BASE+path,{method:options.method||"GET",headers,body:options.body?JSON.stringify(options.body):undefined,cache:"no-store",credentials:"omit",redirect:"follow"});
 let body;try{body=await response.json();}catch{body={}}
 if(!response.ok){const e=new Error(body.msg||body.error_description||body.message||"Request failed");e.status=response.status;throw e;}
 return body;
}
async function withBusy(fn){if(busy)return;busy=true;$("login").disabled=true;$("signup").disabled=true;clearMessages();try{await fn();}catch(e){msg("error",e?.message||"Something went wrong");}finally{busy=false;$("login").disabled=false;$("signup").disabled=true;}}
async function signup(){
 await withBusy(async()=>{
  const password=$("password").value;
  if(password.length<12)throw Error("Use a password of at least 12 characters.");
  await api("/auth/v1/signup",{method:"POST",body:{email:OWNER,password}});
  msg("status","Confirmation requested for the company email. Verify from the email link, then return and sign in. Email delivery depends on the existing Supabase Auth configuration.");
 });
}
async function login(){
 await withBusy(async()=>{
   const password=$("password").value;
   if(!password)throw Error("Enter the Finance password.");
   const result=await api("/auth/v1/token?grant_type=password",{method:"POST",body:{email:OWNER,password}});
   if(!result?.access_token)throw Error("Login token unavailable. Verify your email first.");
   const user=await api("/auth/v1/user",{},result.access_token);
   if(user.email?.toLowerCase()!==OWNER||!user.email_confirmed_at)throw Error("Finance owner email verification required.");
   const access=await api("/rest/v1/finance_access?select=access_level,active&limit=1",{},result.access_token);
   if(!Array.isArray(access)||access.length!==1||access[0].active!==true)throw Error("Finance Owner permission is pending. No Finance data has been opened.");
   token=result.access_token;sessionUser=user.id;
   $("password").value="";
   hide("authPanel",true);hide("dashboard",false);
   msg("signedIn","Email verified · Viewer access · No write permissions");
   await refresh();
 });
}
async function fetchAll(){
 if(!token)throw Error("Not signed in");
 const result=[];let afterType=null,afterKey=null;
 for(let page=0;page<30;page++){
   const rows=await api("/rest/v1/rpc/finance_read_snapshot",{method:"POST",
      body:{p_after_type:afterType,p_after_key:afterKey,p_page_size:200}},token);
   if(!Array.isArray(rows))throw Error("Cloud result was not a record list");
   for(const row of rows)result.push(row);
   if(rows.length<200)return result;
   if(!rows.length)break;
   const last=rows[rows.length-1];
   if(!last.entity_type||!last.entity_key||last.entity_type===afterType&&last.entity_key===afterKey)throw Error("Invalid snapshot cursor");
   afterType=last.entity_type;afterKey=last.entity_key;
 }
 throw Error("Unexpected number of finance records – contact accounting admin.");
}
function render(records){
 const entries=records.filter(r=>r.entity_type==="entries"&&!r.deleted_at).map(r=>r.payload);
 const groups={};
 for(const entry of entries){
   const kind=String(entry?.kind||"other");
   const amount=Number(entry?.amount||0),amount2=Number(entry?.amount2||0);
   if(!Number.isFinite(amount)||!Number.isFinite(amount2))throw Error("Invalid cloud accounting amount.");
   if(!groups[kind])groups[kind]={count:0,sum:0,final:0};
   groups[kind].count++;groups[kind].sum+=amount;groups[kind].final+=amount2;
 }
 const d=groups.delivery||{count:0,final:0}, c=groups.collection||{count:0,sum:0},p=groups.purchase||{count:0,sum:0},h=groups.handover||{sum:0};
 const items=[["Finance records",String(records.length)],["Delivery · final",money(d.final)],["Collections",money(c.sum)],["Purchases",money(p.sum)],["Cash handover",money(h.sum)]];
 const el=$("metrics");el.replaceChildren();
 for(const [title,value] of items){
  const box=document.createElement("div");box.className="metric";
  const t=document.createElement("small");t.textContent=title;
  const b=document.createElement("b");b.textContent=value;box.append(t,b);el.append(box);
 }
 const table=document.createElement("table"),thead=document.createElement("thead"),hrow=document.createElement("tr");
 for(const title of ["Ledger","Entries","Original amount","Final amount"]){const th=document.createElement("th");th.textContent=title;hrow.append(th);}
 thead.append(hrow);const tbody=document.createElement("tbody");
 for(const [name,stats] of Object.entries(groups).sort((a,b)=>a[0].localeCompare(b[0]))){
  const row=document.createElement("tr");
  for(const val of [name,stats.count,money(stats.sum),money(stats.final)]){
   const td=document.createElement("td");td.textContent=String(val);row.append(td);
  }tbody.append(row);
 }
 table.append(thead,tbody);$("table").replaceChildren(table);
 msg("rowsMeta","Showing "+records.length+" imported snapshot records. 25 Oct 2026 baseline only; not a live cash closing or GST report.");
}
async function refresh(){
 if(!token)throw Error("Session closed");
 msg("rowsMeta","Loading cloud snapshot…");
 try{render(await fetchAll());}catch(e){msg("rowsMeta","Error loading Finance snapshot: "+(e.message||"unknown"));}
}
// Finance-only invitation/recovery finish: use HTTPS callback and a one-time Supabase session.
// Keep credentials only in memory; immediately remove the hash from browser history.
const FINANCE_CALLBACK="https://ecoobasketb2b.com/finance-cloud/index.html";
let setupToken=null;
async function setupFromRedirect(){
 const hash=window.location.hash;
 if(!hash)return;
 const params=new URLSearchParams(hash.slice(1));
 const kind=params.get("type");
 const candidate=params.get("access_token");
 const err=params.get("error_description")||params.get("error");
 // Remove the token from browser chrome/history before any remote requests.
 window.history.replaceState(null,"",window.location.pathname+window.location.search);
 if(err){msg("error",err);return;}
 if(!candidate || !["invite","recovery"].includes(kind))return;
 try{
  const user=await api("/auth/v1/user",{},candidate);
  if(user.email?.toLowerCase()!==OWNER)throw Error("Invitation belongs to a different account.");
  setupToken=candidate;
  hide("authPanel",true);hide("passwordSetup",false);
  msg("passwordSetupStatus","Invitation verified. Choose a new Finance Cloud password.");
 }catch(e){
  setupToken=null;
  msg("error","Invitation or recovery link invalid/expired. Use Set / reset password to request a fresh link.");
 }
}
async function requestPasswordReset(){
 await withBusy(async()=>{
  const u="/auth/v1/recover?redirect_to="+encodeURIComponent(FINANCE_CALLBACK);
  await api(u,{method:"POST",body:{email:OWNER}});
  msg("status","Password setup email requested. Open the new email in ecoobasket@gmail.com. Do not share the link or OTP.");
 });
}
async function saveFinancePassword(){
 if(!setupToken){msg("passwordSetupError","Open a current email invitation or recovery link first.");return;}
 const password=$("newFinancePassword").value;
 if(password.length<12 || password!==$("confirmFinancePassword").value){
  msg("passwordSetupError","Passwords must match and be at least 12 characters.");return;
 }
 $("saveFinancePassword").disabled=true;
 msg("passwordSetupError","");
 try{
  await api("/auth/v1/user",{method:"PUT",body:{password}},setupToken);
  $("newFinancePassword").value="";$("confirmFinancePassword").value="";
  setupToken=null;
  hide("passwordSetup",true);hide("authPanel",false);
  msg("status","Finance password saved. Use Sign in. Finance data access still needs administrator approval.");
 }catch(e){
  msg("passwordSetupError",e?.message||"Could not save password. Request a new recovery link.");
 }finally{$("saveFinancePassword").disabled=false;}
}
$("requestPasswordReset").addEventListener("click",requestPasswordReset);
$("saveFinancePassword").addEventListener("click",saveFinancePassword);
window.addEventListener("hashchange",()=>{void setupFromRedirect();});
void setupFromRedirect();

$("signup").addEventListener("click",signup);
$("login").addEventListener("click",login);
$("reload").addEventListener("click",refresh);
$("logout").addEventListener("click",()=>{token=null;sessionUser=null;hide("dashboard",true);hide("authPanel",false);msg("rowsMeta","");msg("signedIn","");clearMessages();});
})();
