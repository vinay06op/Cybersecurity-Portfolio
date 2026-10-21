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
    summary:"An ongoing hands-on network security project focused on capturing and analyzing network traffic using Wireshark. The project explores TCP/IP communication, DNS queries, packet inspection, and network troubleshooting in a controlled lab environment.",
    status:"Status: In Progress — Active hands-on learning lab.",
    tools:["Wireshark","TCP/IP","DNS","Windows networking tools"],
    sections:[
      {
        title:"Project Overview",
        content:"Network traffic analysis is the process of capturing, decoding, and inspecting data packets traversing a communication network. It provides visibility into how hosts, services, and protocols interact, helping identify connectivity issues, configuration flaws, and potential security threats. Wireshark is an industry-standard packet analysis tool that captures raw network frames in real time and decodes protocols across network layers, enabling deep inspection of packet headers, protocol handshakes, payloads, and communication flows."
      },
      {
        title:"Current Progress",
        items:[
          "Status: In Progress",
          "Current Stage: Learning packet capture, filtering, and protocol analysis."
        ]
      },
      {
        title:"Planned Activities",
        items:[
          "Capture network traffic from my own computer or an authorized lab.",
          "Learn to use Wireshark capture and display filters.",
          "Analyze TCP connections and communication patterns.",
          "Inspect DNS queries and responses.",
          "Examine packet retransmissions and connection failures.",
          "Investigate unusual traffic patterns when appropriate.",
          "Document observations and capture screenshots for evidence."
        ]
      },
      {
        title:"Tools and Technologies",
        items:[
          "Wireshark",
          "TCP/IP",
          "DNS",
          "Windows networking tools"
        ],
        tags:[
          "Wireshark",
          "TCP/IP",
          "DNS",
          "Windows networking tools"
        ]
      },
      {
        title:"Project Evidence",
        content:"Evidence will be added as the project progresses."
      },
      {
        title:"GitHub Repository",
        repoUrl: null
      }
    ],
    note:"All network analysis activities are conducted strictly on personal systems or authorized learning environments. Captures and traces will be sanitized before publishing."
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
  if(!sections)return "";
  return sections.map(s=>{
    let body="";
    if(s.content)body+=`<p>${escapeHTML(s.content)}</p>`;
    if(s.items)body+=`<ul>${s.items.map(i=>`<li>${escapeHTML(i)}</li>`).join("")}</ul>`;
    if(s.tags)body+=`<div class="modal-tech">${s.tags.map(t=>`<span>${escapeHTML(t)}</span>`).join("")}</div>`;
    if(s.repoUrl !== undefined){
      if(s.repoUrl){
        body+=`<p><a href="${escapeHTML(s.repoUrl)}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">View GitHub Repository ↗</a></p>`;
      } else {
        body+=`<p class="repo-plain-text">Repository coming soon</p>`;
      }
    }
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

  const hasToolsSection = p.sections && p.sections.some(s=>s.title.toLowerCase().includes("tools"));
  const hasEvidenceSection = p.sections && p.sections.some(s=>s.title.toLowerCase().includes("evidence"));

  let html=`
    <p class="eyebrow">${escapeHTML(p.number)} / ${escapeHTML(p.category)}</p>
    <h2 id="modalTitle">${escapeHTML(p.title)}</h2>
    <p class="modal-description">${escapeHTML(p.summary)}</p>
    <p class="project-status-note">${escapeHTML(p.status)}</p>`;

  if(p.tools && !hasToolsSection){
    html+=`<section class="modal-section"><h3>Tools & Technologies</h3><div class="modal-tech">${p.tools.map(t=>`<span>${escapeHTML(t)}</span>`).join("")}</div></section>`;
  }

  html+=renderSections(p.sections);

  if(p.evidence && !hasEvidenceSection){
    html+=`<section class="modal-section"><h3>Evidence & Documentation</h3><p>These resources are placeholders until actual evidence URLs are added.</p><div class="modal-evidence-grid">${renderEvidence(p.evidence)}</div></section>`;
  }

  if(p.note){
    html+=`<section class="modal-section"><h3>Publication note</h3><p class="modal-disclaimer">${escapeHTML(p.note)}</p></section>`;
  }

  modalContent.innerHTML=html;
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

/* Certificate Modal & Interactivity */
const certModal=document.getElementById("certModal");
const certModalClose=document.getElementById("certModalClose");
const certModalImg=document.getElementById("certModalImg");
const certModalTitle=document.getElementById("certModalTitle");
const certModalIssuer=document.getElementById("certModalIssuer");
const certModalExtLink=document.getElementById("certModalExtLink");
const certModalBadges=document.getElementById("certModalBadges");
const certModalCredlyWrap=document.getElementById("certModalCredlyWrap");

function openCertificate(src,title,provider,tags,credlyUrl){
  if(!certModal)return;
  lastFocusedElement=document.activeElement;
  certModalImg.src=src;
  certModalImg.alt=title;
  certModalTitle.textContent=title;
  certModalIssuer.textContent=provider||"";
  certModalExtLink.href=src;

  if(tags){
    const tagList=tags.split("|").filter(Boolean);
    certModalBadges.innerHTML=tagList.map(t=>`<span class="cert-tag">${escapeHTML(t)}</span>`).join("");
  }else{
    certModalBadges.innerHTML="";
  }

  if(credlyUrl){
    certModalCredlyWrap.innerHTML=`<a href="${escapeHTML(credlyUrl)}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">Verify Credential on Credly ↗</a>`;
  }else{
    certModalCredlyWrap.innerHTML="";
  }

  certModal.classList.add("is-open");
  certModal.setAttribute("aria-hidden","false");
  document.body.classList.add("modal-open");
  if(certModalClose)certModalClose.focus();
}

function closeCertificate(){
  if(!certModal||!certModal.classList.contains("is-open"))return;
  certModal.classList.remove("is-open");
  certModal.setAttribute("aria-hidden","true");
  document.body.classList.remove("modal-open");
  if(lastFocusedElement)lastFocusedElement.focus();
}

if(certModalClose){
  certModalClose.addEventListener("click",closeCertificate);
}
if(certModal){
  certModal.querySelectorAll("[data-close-cert-modal]").forEach(el=>el.addEventListener("click",closeCertificate));
}

document.querySelectorAll("[data-cert-src]").forEach(el=>{
  const handler=()=>{
    const src=el.dataset.certSrc;
    const title=el.dataset.certTitle||"Certificate";
    const provider=el.dataset.certProvider||"";
    const tags=el.dataset.certTags||"";
    const credly=el.dataset.credlyUrl||"";
    openCertificate(src,title,provider,tags,credly);
  };
  el.addEventListener("click",handler);
  if(el.getAttribute("role")==="button"){
    el.addEventListener("keydown",e=>{
      if(e.key==="Enter"||e.key===" "){
        e.preventDefault();
        handler();
      }
    });
  }
});

/* IBM SkillsBuild Group Expand / Collapse Toggle */
const ibmToggleBtn=document.getElementById("ibmToggleBtn");
const ibmExpandedSection=document.getElementById("ibmExpandedSection");
if(ibmToggleBtn&&ibmExpandedSection){
  ibmToggleBtn.addEventListener("click",()=>{
    const isHidden=ibmExpandedSection.hasAttribute("hidden");
    if(isHidden){
      ibmExpandedSection.removeAttribute("hidden");
      ibmToggleBtn.setAttribute("aria-expanded","true");
      ibmToggleBtn.innerHTML='Collapse Certificates <span class="toggle-arrow" aria-hidden="true">↑</span>';
    }else{
      ibmExpandedSection.setAttribute("hidden","");
      ibmToggleBtn.setAttribute("aria-expanded","false");
      ibmToggleBtn.innerHTML='View All Certificates <span class="toggle-arrow" aria-hidden="true">↓</span>';
    }
  });
}

document.addEventListener("keydown",e=>{
  if(e.key==="Escape"){
    if(certModal&&certModal.classList.contains("is-open")){
      closeCertificate();
      return;
    }
    if(projectModal&&projectModal.classList.contains("is-open")){
      closeProject();
      return;
    }
  }
  if(e.key==="Tab"){
    let activeModalDialog=null;
    if(certModal&&certModal.classList.contains("is-open")){
      activeModalDialog=certModal.querySelector(".modal-dialog");
    }else if(projectModal&&projectModal.classList.contains("is-open")){
      activeModalDialog=modalDialog;
    }
    if(!activeModalDialog)return;
    const focusable=Array.from(activeModalDialog.querySelectorAll('a[href],button:not([disabled]),[tabindex="0"]'));
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

