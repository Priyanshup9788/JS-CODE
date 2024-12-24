const quotes = [
    {
        text: "The best way to predict the future is to create it.",
        author: "Abraham Lincoln"
    },
    {
        text: "Success is not final, failure is not fatal: It is the courage to continue that counts.",
        author: "Winston Churchill"
    },
    {
        text: "In the middle of difficulty lies opportunity.",
        author: "Albert Einstein"
    },
    {
        text: "What lies behind us and what lies before us are tiny matters compared to what lies within us.",
        author: "Ralph Waldo Emerson"
    },
    {
        text: "The only limit to our realization of tomorrow is our doubts of today.",
        author: "Franklin D. Roosevelt"
    },
    {
        text: "It does not matter how slowly you go as long as you do not stop.",
        author: "Confucius"
    },
    {
        text: "You must be the change you wish to see in the world.",
        author: "Mahatma Gandhi"
    },
    {
        text: "The only way to do great work is to love what you do.",
        author: "Steve Jobs"
    },
    {
        text: "The journey of a thousand miles begins with one step.",
        author: "Lao Tzu"
    },
    {
        text: "Success usually comes to those who are too busy to be looking for it.",
        author: "Henry David Thoreau"
    }
];

let quote_btn=document.getElementById("quote-btn");
let quote=document.getElementById("quote");
let author=document.getElementById("author");

quote_btn.addEventListener("click",()=>{

    
    let randomindex=Math.floor(Math.random()*quotes.length);

    quote.textContent=`${quotes[randomindex]["text"]}`;
    author.textContent=`${quotes[randomindex]["author"]}`;

   

});