const steps = [
 {title:"Открой Replit",desc:"Открой сайт Replit в браузере. Пока ничего не покупай и не создавай.",instruction:"Нажми кнопку ниже. Зарегистрируйся бесплатным способом, если доступен бесплатный вариант. Если появится предложение оплаты — пропусти его.",url:"https://replit.com/",button:"Открыть Replit",message:"Начинаем с подготовки бесплатной рабочей среды. Сейчас только этот шаг."},
 {title:"Создай первый проект",desc:"Внутри Replit создай новый веб-проект.",instruction:"Выбери создание приложения или веб-проекта. Если интерфейс отличается, пришли наставнику скриншот — не угадывай и не покупай тариф.",url:"https://replit.com/",button:"Вернуться в Replit",message:"Хорошо. Теперь создаём основу продукта. Не добавляй лишних функций."},
 {title:"Сгенерируй MVP",desc:"Создай минимальную версию AI-помощника для объявлений недвижимости.",instruction:"Вставь в AI-помощник Replit запрос: «Создай адаптивное веб-приложение на русском языке для генерации объявлений о недвижимости в Узбекистане. Поля: тип объекта, город, район, площадь, комнаты, этаж, цена, особенности. Кнопка Создать объявление. Покажи результат на русском и узбекском. Сделай современный интерфейс. Пока без оплаты и регистрации».",url:"https://replit.com/",button:"Открыть проект",message:"Теперь превращаем идею в простой работающий продукт. Сначала проверим основную пользу."},
 {title:"Проверь приложение",desc:"Убедись, что приложение открывается и создаёт текст объявления.",instruction:"Заполни тестовые поля вымышленной квартиры и нажми кнопку генерации. Если генерация не работает или просит платный API-ключ, не оплачивай — сообщи наставнику.",url:"https://replit.com/",button:"Открыть приложение",message:"Проверяем пользу продукта до подключения сложных функций."},
 {title:"Опубликуй первую версию",desc:"Размести тестовую версию в интернете.",instruction:"Используй доступную бесплатную публикацию Replit, если она предлагается на твоём тарифе. Если публикация требует оплаты, остановись: подберём бесплатный способ через GitHub Pages или Cloudflare Pages в зависимости от проекта.",url:"https://replit.com/",button:"Перейти к публикации",message:"Сначала получим публичную ссылку. Это ещё не запуск платного сервиса."},
 {title:"Подготовь аккаунты и доступ",desc:"После проверки продукта добавим сохранение данных и аккаунты.",instruction:"Следующим этапом подключим Supabase для базы данных и входа пользователей. Не публикуй секретные ключи в открытом коде.",url:"https://supabase.com/",button:"Открыть Supabase",message:"Регистрацию подключаем только после проверки работающего продукта."},
 {title:"Подключи оплату",desc:"Подготовь коммерческую модель и платёжного провайдера.",instruction:"Для Узбекистана проверим доступность бизнес-аккаунта и требования Payme/Click. Не вводи данные карты на сторонних сайтах и не обещай подписку до успешного тестового платежа.",url:"https://business.payme.uz/",button:"Изучить Payme Business",message:"Платежи — после работающего продукта, аккаунта и проверки требований провайдера."},
 {title:"Запусти первые продажи",desc:"Проверь предложение на реальных риелторах и получи первую оплату.",instruction:"Подготовим демонстрацию, тарифы и короткое предложение для первых потенциальных клиентов. Первую оплату считаем результатом только после подтверждения платежа.",url:"https://www.google.com/",button:"Перейти к плану продаж",message:"Финальная цель — не просто сайт, а реальный платящий клиент."}
];
let current = Number(localStorage.getItem("mentorStep") || 0);
let completed = JSON.parse(localStorage.getItem("mentorCompleted") || "[]");
const $ = id => document.getElementById(id);
function render(){
 const s=steps[current];
 $("stepNumber").textContent=`ШАГ ${String(current+1).padStart(2,"0")} / ${String(steps.length).padStart(2,"0")}`;
 $("stepTitle").textContent=s.title; $("stepDescription").textContent=s.desc;
 $("stepInstruction").textContent=s.instruction; $("actionLink").href=s.url;
 $("actionLink").innerHTML=`${s.button} <span>↗</span>`;
 $("mentorMessage").textContent=s.message;
 $("progressText").textContent=`${completed.length} из ${steps.length}`;
 $("progressBar").style.width=`${completed.length/steps.length*100}%`;
 $("doneCheck").checked=completed.includes(current);
 $("nextButton").disabled=!$("doneCheck").checked;
 $("nextButton").textContent=current===steps.length-1?"Завершить маршрут ✓":"Подтвердить и продолжить →";
 $("lockLabel").textContent=completed.includes(current)?"ШАГ ВЫПОЛНЕН":"ТЕКУЩАЯ ЗАДАЧА";
 $("routeList").innerHTML=steps.map((x,i)=>`<div class="route-item ${i===current?'active':''} ${completed.includes(i)?'complete':''}"><span class="route-num">${completed.includes(i)?'✓':String(i+1).padStart(2,'0')}</span><div><b>${x.title}</b><small>${i===current?'Выполняем сейчас':completed.includes(i)?'Выполнено':'Закрыто до предыдущего шага'}</small></div></div>`).join("");
}
$("doneCheck").addEventListener("change",e=>{$("nextButton").disabled=!e.target.checked;});
$("nextButton").addEventListener("click",()=>{
 if(!$("doneCheck").checked)return;
 if(!completed.includes(current))completed.push(current);
 localStorage.setItem("mentorCompleted",JSON.stringify(completed));
 if(current<steps.length-1)current++;
 localStorage.setItem("mentorStep",String(current));
 render();
 window.scrollTo({top:0,behavior:"smooth"});
});
render();
if("serviceWorker" in navigator) window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js").catch(()=>{}));