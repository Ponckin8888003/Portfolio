const lightTheme=document.querySelector("#theme-switch-light");
const darkTheme=document.querySelector("#theme-switch-dark");
const enLanguage=document.querySelector('#language-switch-eng');
const uaLanguage=document.querySelector('#language-switch-ukr');
const burger=document.querySelector(".burger_menu_section");
const body=document.querySelector("body");
const textAnimation=document.querySelector(".textAnimation");
const telegramForm=document.querySelector("#telegramForm");

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

        textAnimation.classList.add("engAnimatedText");
        textAnimation.classList.remove("ukrAnimatedText");
    }else{
        uaLanguage.checked=true;

        textAnimation.classList.remove("engAnimatedText");
        textAnimation.classList.add("ukrAnimatedText");
    }
})();

lightTheme.addEventListener("click", handleLightTheme);
darkTheme.addEventListener("click", handleDarkTheme);
enLanguage.addEventListener("click", enButtonAnimation);
uaLanguage.addEventListener("click", uaButtonAnimation);
burger.addEventListener("click", handleMenu);
telegramForm.addEventListener("submit", handleMessage);

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

const TOKEN="7572524186:AAGL4EfxF0JLCMMUCnYTET5ERK3NohznPQE";
const CHATID="-1002312371608";
const BOT_URL = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

async function handleMessage(e){
    e.preventDefault();

    const options=document.querySelectorAll("#formOption");
    const selectedOptions=[];
    options.forEach(option=>{
        if(option.checked){
            selectedOptions.push(option.value);
        }
    });

    const name=e.target.name.value;
    const eMail=e.target.eMail.value;
    const text=e.target.textArea.value;

    const message=`**Нове замовлення**\n\n
                    **Ім'я**: ${name}\n
                    **E-mail**: ${eMail}\n
                    **Повідомлення**: ${text}\n
                    **Опції**: ${selectedOptions}\n`;

    try{
        await axios.post(BOT_URL, {
            chat_id: CHATID,
            parse_mode: 'Markdown',
            text: message
        });
        alert("Контактні дані надіслано!!!");
    }catch(err){
        console.error(err);
        alert("Сталася помилка, спробуйте ще раз!!!");
    }

    telegramForm.reset();
}
