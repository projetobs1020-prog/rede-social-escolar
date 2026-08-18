window.Auth={
 user:{id:"demo",name:"Aluno Demo",initial:"WL",school:"Minha Escola",className:"9º Ano · Turma A",verified:true,role:"admin"},
 loginDemo(){localStorage.setItem("conecta_logged","1"); this.refresh()},
 loginGoogle(){App.toast("Google Login é visual neste protótipo.");this.loginDemo()},
 logout(){localStorage.removeItem("conecta_logged");location.reload()},
 refresh(){document.getElementById("loginScreen").classList.add("hidden");document.getElementById("app").classList.remove("hidden");document.getElementById("miniName").textContent=this.user.name;document.getElementById("miniClass").textContent=this.user.className+" · Verificado ✓"}
};