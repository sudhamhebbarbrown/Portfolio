let input = document.querySelector("input");
let terminalBody = document.querySelector("#terminalBody");

let commandList = ['bio', "education", "skills", 'clear', 'themes'];


const functionCalls = () => {
    checkWindowClick();
    checkPressedEnter();
}


const checkWindowClick = () => {
    terminalBody.addEventListener('click', () => input.focus());
}

const checkPressedEnter = () => {
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            execute(input.value);
        }
    });
}

const execute = (inputValue) => {
    let temp = input.value;
    input.remove();
    terminalBody.innerHTML += temp;
    checkCommand(temp);
    addInput();
}

const executeCommand = (command) => {

    terminalBody.innerHTML += '<br />'

    for(let i=0; i<data[command].length; ++i){

        terminalBody.innerHTML += `${data[command][i].name}: ` ;

        if(data[command][i].value.includes('http')){
            terminalBody.innerHTML += `<a href="${data[command][i].value}" target="_blank">${data[command][i].value}</a>` ;
        } else{
            terminalBody.innerHTML += `${data[command][i].value}` ;
        }
    }
}

const checkCommand = (inputCommand) => {

    terminalBody.innerHTML += '<br>';
    let command = inputCommand.split(" ")[0];

    if(command){
        if(command === 'clear'){ commandClear();}
        else if(command === 'echo') {commandEcho(inputCommand);}
        else if(command === 'github'){ commandGithub(command)}
        else if(command === 'ls'){ commandHelp();}
        else if(command === 'resume'){ commandResume();}
        else if(command === 'education') { commandEducation();}
        else if(command === 'sudo') { commandSudo();}
        else if(command === 'themes') {commandTheme(inputCommand)}
        else if(command === "bio") {commandbio()}
        else if(command === "skills") {commandskills()}
        else{
            terminalBody.innerHTML +=  inputCommand + ' is not recognized as a command, Try \"help\"';
        }
    }
    terminalBody.innerHTML += '<br>';
}

function commandSudo() {
    window.open('https://www.example.com', '_blank');
}
function addInput() {
    terminalBody.innerHTML += '<span class="guest">guest</span>@<span class="localhost">localhost</span> :$ - <input type="text" autofocus />';
    input = document.querySelector("input");
    input.focus();
    functionCalls();
}

const commandClear = () => { terminalBody.innerHTML = '' }

function commandHelp() {
    text = '<br>'
    for (let i =0; i<commandList.length; i++){
        text += (i+1) + ". " + commandList[i] + '<br>';
    }
    terminalBody.innerHTML += text + '<br>';
}

function commandGithub() {
    terminalBody.innerHTML += `<i class="fa fa-github"> <a href="https://github.com/${data.github[0].value}" target="_blank">${data.github[0].value}</a>`;
}

function commandResume() {
    terminalBody.innerHTML += `<a href=assets/${data.resume}>Resume</a>`;
}

function commandEcho(inputCommand) {
    for(let i=1; i<inputCommand.split(' ').length; i++){
        terminalBody.innerHTML += inputCommand.split(' ')[i] + ' ';
    }
    terminalBody.innerHTML += '<br>';
}
const themes = {
    "default": {
        "primaryColor": "#5b6d5b",
        "backgroundColor": "#f0f0f0",
        "textColor": "#333"
    },
    "dark": {
        "primaryColor": "#4b8f8c",
        "backgroundColor": "#333",
        "textColor": "#fff"
    },
    "light": {
        "primaryColor": "#fbf1c7",
        "backgroundColor": "#fbf1c7",
        "textColor": "#3c3836"
    }};

function commandTheme(command){
    if(command.split(" ").length == 1){
        text = "Available themes: <br> 1. Light <br> 2. Dark <br> 3. Midnight <br> Type \"themes themename\" to apply a theme <br>" 
        terminalBody.innerHTML += text
    }
    else {
        theme = command.split(' ')[1].toLowerCase()
        applyTheme(theme)
        if (!themes.hasOwnProperty(theme)){
            terminalBody.innerHTML +=  theme + ' is not recognized as a command, Try \"help\"';
        }
        else {
            applyTheme(theme)
            terminalBody.innerHTML += theme + ' theme applied'
        }

    }
}

function applyTheme(themeName) {
    const theme = themes[themeName];
    for (const property in theme) {
        document.documentElement.style.setProperty(`--${property}`, theme[property]);
    }
}

function defaultTheme(){
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        applyTheme("dark")
    } else {
        applyTheme("light")
    }
}

document.getElementById('terminalInput').addEventListener('input', function() {
    word= this.value.split(" ")[0]

});

function commandbio(){
    text = "<br>"
    text += "Welcome to my portfolio! I'm Sudham Hebbar, a driven and innovative computer science professional with a passion for technology and its transformative power. Originally from Bangalore, India, I'm currently pursuing my Master's in Computer Science at Brown University. <br>"
    text += "Before joining Brown, I honed my skills as a Java Developer at Schneider Electric for two years. I'm deeply involved in software development, problem-solving, and team collaboration. <br>"
    text += "At Brown University, I'm exploring the latest innovations in software development and data science. When I'm not coding, I enjoy house and techno music. <br>"
    text += "Feel free to explore my portfolio to see my projects, skills, and the journey I've embarked on in the realm of computer science. <br>"
    terminalBody.innerHTML += text
}

function commandEducation() {
    text = "<br>"
    text += "1. &nbsp; Degree: Master of Science in Computer Science <br> &nbsp;&nbsp;&nbsp;&nbsp College: Brown University <br> &nbsp;&nbsp;&nbsp;&nbsp Courses: Design of Programming Languages, Design of Algorithms, Distributed Systems, Software Engineering <br> &nbsp;&nbsp;&nbsp;&nbsp GPA: N/A <br> &nbsp;&nbsp;&nbsp;&nbsp Graduation: May 2025 <br><br>"
    text += "2. &nbsp; Bachelor of Engineering in Computer Science <br> &nbsp;&nbsp;&nbsp;&nbsp College: M S Ramaiah Institute of Technology <br> &nbsp;&nbsp;&nbsp;&nbsp Courses: OOPS, Advanced Java, Machine Learning, Operating Systems, Computer Networks <br> &nbsp;&nbsp;&nbsp;&nbsp GPA: 3.81 <br> &nbsp;&nbsp;&nbsp;&nbsp Graduation: July 2021 <br><br>"
    terminalBody.innerHTML += text

}

function commandskills(){
    text = "<br>"
    text += " Java &nbsp;&nbsp;&nbsp;&nbsp Spring Framework &nbsp;&nbsp;&nbsp;&nbsp Python &nbsp;&nbsp;&nbsp;&nbsp AWS &nbsp;&nbsp;&nbsp;&nbsp MongoDB &nbsp;&nbsp;&nbsp;&nbsp SQL &nbsp;&nbsp;&nbsp;&nbsp React &nbsp;&nbsp;&nbsp;&nbsp Docker &nbsp;&nbsp;&nbsp;&nbsp ..."
    terminalBody.innerHTML += text
}
defaultTheme();
functionCalls();