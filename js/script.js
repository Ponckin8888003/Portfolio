const lightTheme=document.querySelector("#theme-switch-light");
const darkTheme=document.querySelector("#theme-switch-dark");
const enLanguage=document.querySelector('#language-switch-eng');
const uaLanguage=document.querySelector('#language-switch-ukr');
const burger=document.querySelector(".burger_menu_section");
const body=document.querySelector("body");

(function initialTheme(){
    const theme=localStorage.getItem("theme");
    if(!theme){
        const usesDarkTheme=window.matchMedia("(prefers-color-scheme: dark)").matches;
        if(usesDarkTheme){
            darkTheme.checked=true;
            handleDarkTheme();
        }else{
            lightTheme.checked=true;
            handleLightTheme();
        }
    }else{
        if(theme==="dark"){
            darkTheme.checked=true;
            handleDarkTheme();
        }else{
            lightTheme.checked=true;
            handleLightTheme();
        }
    }


    const language=localStorage.getItem("lan");
    if(!language){
        if(navigator.language==="uk-UA"){
            uaLanguage.checked=true;    
        }else{
            enLanguage.checked=true;
        }
    }

    if(language==="en"){
        enLanguage.checked=true;
    }else{
        uaLanguage.checked=true;
    }
})();

lightTheme.addEventListener("click", handleLightTheme);
darkTheme.addEventListener("click", handleDarkTheme);
enLanguage.addEventListener("click", enButtonAnimation);
uaLanguage.addEventListener("click", uaButtonAnimation);
burger.addEventListener("click", handleMenu);

function handleLightTheme(){
    body.classList.remove("dark_theme");
    body.classList.add("light_theme");

    localStorage.setItem("theme", "light");
}
function handleDarkTheme(){
    body.classList.remove("light_theme");
    body.classList.add("dark_theme");

    localStorage.setItem("theme", "dark");
}
function uaButtonAnimation(){
    uaLanguage.checked=true; 
    enLanguage.checked=false;
    localStorage.setItem("lan", "ua");
}
function enButtonAnimation(){
    uaLanguage.checked=false; 
    enLanguage.checked=true;
    localStorage.setItem("lan", "en");
}
function handleMenu(){
    const openedBurger=document.querySelector(".open_burger_menu");
    const closedBurger=document.querySelector(".close_burger_menu");
    const navigation=document.querySelector(".navigation_content_section");

    openedBurger.classList.toggle("closed");
    closedBurger.classList.toggle("closed");
    navigation.classList.toggle("open");
}