/* Portfolio interactivity: projects, navigation, accessibility */
const projects = {
  vulnerability: {
    number:"PROJECT_001", category:"WEB APPLICATION SECURITY",
    title:"Website Vulnerability Assessment",
    summary:"Website security assessment activities to understand potential vulnerabilities, examine security configurations, and identify areas for improvement.",
    status:"Activities listed in the portfolio; publish findings only when verified.",
    sections:[
      {title:"What was the project?",content:"A website security assessment focused on observing website behavior, reviewing security configurations, and investigating potential weaknesses using appropriate tools."},
      {title:"Why did I work on it?",content:"To understand how web applications can introduce security risks and how a structured assessment can help identify issues for further investigation."},
      {title:"Objective",content:"Assess an authorized target, collect relevant observations, classify findings where evidence supports it, and document useful remediation recommendations."},
      {title:"Activities described",items:["Performed passive website vulnerability assessment using OWASP ZAP.","Conducted network reconnaissance using Nmap.","Examined website security configurations with Chrome Developer Tools.","Documented findings and risk classifications.","Prepared remediation recommendations for identified issues."]},
      {title:"Skills developed",items:["Web application security fundamentals.","Network reconnaissance and configuration review.","Evidence collection and vulnerability documentation.","Risk communication and responsible testing."]},
      {title:"Outcome",content:"Add the actual assessment report, confirmed findings, severity ratings, and remediation status. Do not claim a vulnerability was confirmed unless the evidence supports it."},
      {title:"Real-world relevance",content:"Web application assessments help teams identify and remediate weaknesses before they are exploited. Clear reports support prioritization and verification."}
    ],
    tools:["OWASP ZAP","Nmap","Chrome Developer Tools"],
    evidence:[["GitHub repository","Add repository URL"],["Assessment screenshots","Add genuine screenshots"],["Technical write-up","Add report or write-up"],["Demo / documentation","Add an authorized demo or report"]],
    note:"Only test systems you own or have explicit permission to assess. Remove credentials, personal data, and confidential findings before publishing evidence."
  },
  wireshark:{
    number:"PROJECT_002",category:"NETWORK SECURITY",
    title:"Network Traffic Analysis Using Wireshark",
    summary:"A hands-on learning project focused on understanding network communication and analysing packets in a controlled environment.",
    status:"The source portfolio labels these activities as planned; update this project as tasks are completed.",
    sections:[
      {title:"What is the project?",content:"A practical packet-analysis lab designed to examine network communication and learn how protocols appear in packet captures."},
      {title:"Why work on it?",content:"Packet analysis supports network troubleshooting and helps security analysts investigate communication patterns and unusual activity."},
      {title:"Objective",content:"Capture or inspect traffic in a controlled environment, apply protocol filters, record observations, and explain the relevant security considerations."},
      {title:"Planned activities",items:["Examine TCP connections and network protocols.","Analyse DNS queries and responses.","Apply packet filters to investigate traffic.","Study HTTP requests and HTTPS connection metadata.","Document observations and security considerations."]},
      {title:"Skills developed",items:["Network protocol analysis.","Packet inspection and filtering.","DNS and TCP/IP fundamentals.","Network troubleshooting.","Technical documentation."]},
      {title:"Outcome",content:"This project is marked as a learning activity until completed evidence is added. Publish a sanitized capture, screenshots, filters used, observations, and conclusions."},
      {title:"Real-world relevance",content:"Packet analysis can help investigate connectivity problems, understand protocol behavior, and support defensive investigations."}
    ],
    tools:["Wireshark","TCP/IP","DNS","Packet Filters"],
    evidence:[["Capture file","Add sanitized .pcapng file if safe"],["Screenshots","Add genuine analysis screenshots"],["Technical write-up","Add observations and conclusions"],["Repository","Add lab notes repository"]],
    note:"Only publish sanitized packet captures. Network traces can expose IP addresses, identifiers, and other sensitive information."
  }
};

const menuToggle=document.getElementById("menuToggle");
const navLinks=document.getElementById("navLinks");
const filterButtons=document.querySelectorAll(".filter-btn");
const projectCards=document.querySelectorAll(".project-card");
const projectModal=document.getElementById("projectModal");
const modalDialog=projectModal.querySelector(".modal-dialog");
const modalContent=document.getElementById("modalContent");
const modalClose=document.getElementById("modalClose");
let lastFocusedElement=null;

function escapeHTML(value){
  return String(value).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
}

function closeNavigation(){
  navLinks.classList.remove("is-open");
  menuToggle.setAttribute("aria-expanded","false");
}
menuToggle.addEventListener("click",()=>{
  const open=navLinks.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded",String(open));
});
navLinks.querySelectorAll("a").forEach(a=>a.addEventListener("click",closeNavigation));
document.addEventListener("click",e=>{
  if(!navLinks.contains(e.target)&&!menuToggle.contains(e.target))closeNavigation();
});

filterButtons.forEach(button=>button.addEventListener("click",()=>{
  const filter=button.dataset.filter;
  filterButtons.forEach(b=>{
    const active=b===button;
    b.classList.toggle("active",active);
    b.setAttribute("aria-pressed",String(active));
  });
  projectCards.forEach(card=>{
    card.classList.toggle("is-hidden",filter!=="all"&&card.dataset.category!==filter);
  });
}));

function renderSections(sections){
  return sections.map(s=>{
    let body=s.content?`<p>${escapeHTML(s.content)}</p>`:"";
    if(s.items)body+=`<ul>${s.items.map(i=>`<li>${escapeHTML(i)}</li>`).join("")}</ul>`;
    return `<section class="modal-section"><h3>${escapeHTML(s.title)}</h3>${body}</section>`;
  }).join("");
}
function renderEvidence(items){
  return items.map(([title,label])=>`<div class="evidence-link is-placeholder"><strong>${escapeHTML(title)}</strong><span>${escapeHTML(label)}</span></div>`).join("");
}
function openProject(key){
  const p=projects[key];
  if(!p)return;
  lastFocusedElement=document.activeElement;
  modalContent.innerHTML=`
    <p class="eyebrow">${escapeHTML(p.number)} / ${escapeHTML(p.category)}</p>
    <h2 id="modalTitle">${escapeHTML(p.title)}</h2>
    <p class="modal-description">${escapeHTML(p.summary)}</p>
    <p class="project-status-note">${escapeHTML(p.status)}</p>
    <section class="modal-section"><h3>Tools & Technologies</h3><div class="modal-tech">${p.tools.map(t=>`<span>${escapeHTML(t)}</span>`).join("")}</div></section>
    ${renderSections(p.sections)}
    <section class="modal-section"><h3>Evidence & Documentation</h3><p>These resources are placeholders until actual evidence URLs are added.</p><div class="modal-evidence-grid">${renderEvidence(p.evidence)}</div></section>
    <section class="modal-section"><h3>Publication note</h3><p class="modal-disclaimer">${escapeHTML(p.note)}</p></section>`;
  projectModal.classList.add("is-open");
  projectModal.setAttribute("aria-hidden","false");
  document.body.classList.add("modal-open");
  modalDialog.scrollTop=0;
  modalClose.focus();
}
function closeProject(){
  if(!projectModal.classList.contains("is-open"))return;
  projectModal.classList.remove("is-open");
  projectModal.setAttribute("aria-hidden","true");
  document.body.classList.remove("modal-open");
  if(lastFocusedElement)lastFocusedElement.focus();
}
document.querySelectorAll(".project-open").forEach(button=>button.addEventListener("click",()=>openProject(button.dataset.project)));
modalClose.addEventListener("click",closeProject);
projectModal.querySelectorAll("[data-close-modal]").forEach(el=>el.addEventListener("click",closeProject));
document.addEventListener("keydown",e=>{
  if(!projectModal.classList.contains("is-open"))return;
  if(e.key==="Escape"){closeProject();return;}
  if(e.key==="Tab"){
    const focusable=Array.from(modalDialog.querySelectorAll('a[href],button:not([disabled]),[tabindex="0"]'));
    if(!focusable.length)return;
    const first=focusable[0],last=focusable[focusable.length-1];
    if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}
    else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}
  }
});
document.getElementById("currentYear").textContent=new Date().getFullYear();

/* Enter verified TryHackMe room count here when known; null shows a placeholder. */
const learningStats={tryhackme:null};
document.querySelectorAll("[data-learning-count]").forEach(el=>{
  const count=learningStats[el.dataset.learningCount];
  el.textContent=Number.isInteger(count)&&count>=0?String(count):"Not provided";
});
console.log("Cybersecurity portfolio initialized.");
