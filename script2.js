// pega o formulário de busca  e escuta quando ele é enviado
document.querySelector('#search').addEventListener('submit', async (event) => {

    event.preventDefault(); // impede a página de recarregar quando o formulário é enviado

    const cityName = document.querySelector('#city_name').value; // pega o valor digitado no input da cidade

    // verifica se o usuário não digitou nada
    if (!cityName) {

        document.querySelector("#weather").classList.remove('show'); // esconde o card do clima
        showAlert('Você precisa digitar uma cidade...'); // mostra mensagem de aviso
        return; // para a execução do código
    }

    const apiKey = '8a60b2de14f7a17c7a11706b2cfcd87c'; // chave da API do OpenWeather

    // cria a URL da API com o nome da cidade digitado
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(cityName)}&appid=${apiKey}&units=metric&lang=pt_br`;

    const results = await fetch(apiUrl); // faz a requisição para a API
    const json = await results.json(); // transforma a resposta em formato JSON

    // verifica se a API encontrou a cidade
    if (json.cod === 200) {

        // chama a função showInfo enviando os dados do clima
        showInfo({

            city: json.name, // nome da cidade
            country: json.sys.country, // país da cidade
            temp: json.main.temp, // temperatura atual
            tempMax: json.main.temp_max, // temperatura máxima
            tempMin: json.main.temp_min, // temperatura mínima
            description: json.weather[0].description, // descrição do clima
            tempIcon: json.weather[0].icon, // ícone padrão do clima
            windSpeed: json.wind.speed, // velocidade do vento
            humidity: json.main.humidity, // umidade do ar

        });

    } else { // caso a cidade não seja encontrada

        document.querySelector("#weather").classList.remove('show'); // esconde o card do clima

        // mostra mensagem de erro
        showAlert(`
            Não foi possível localizar...

        `);
    }
});


// função que mostra as informações do clima na tela
function showInfo(json){

    showAlert(''); // limpa qualquer alerta anterior

    document.querySelector("#weather").classList.add('show'); // mostra o card do clima

    const tempBox = document.querySelector('#temp'); // pega o card da temperatura

    tempBox.classList.remove('cold', 'hot', 'normal'); // remove qualquer cor anterior

    const img = document.querySelector('#temp_img'); // pega o elemento da imagem do clima


    // se a temperatura for menor ou igual a 15 graus
    if (json.temp <= 15) {

        tempBox.classList.add('cold'); // aplica a classe de frio (cor azul)

        // usa o ícone padrão da API
        img.src = `https://openweathermap.org/img/wn/${json.tempIcon}@2x.png`;
    } 
    
    // se a temperatura for maior ou igual a 27 graus
    else if (json.temp >= 27) {

        tempBox.classList.add('hot'); // aplica a classe de calor (cor laranja/vermelha)

        // troca o ícone por um sol
        img.src = "https://cdn-icons-png.flaticon.com/512/869/869869.png";
    } 
    
    // se a temperatura estiver entre 16 e 26 graus
    else {

        tempBox.classList.add('normal'); // aplica a cor intermediária

        // usa o ícone padrão da API
        img.src = `https://openweathermap.org/img/wn/${json.tempIcon}@2x.png`;
    }

    // mostra o nome da cidade e país
    document.querySelector('#title').innerHTML = `${json.city}, ${json.country}`;


    // mostra a temperatura atual
    document.querySelector('#temp_value').innerHTML =
        `${json.temp.toFixed(1).toString().replace('.', ',')} <sup>C°</sup>`;
        // toFixed(1) = deixa com 1 casa decimal
        // replace troca ponto por vírgula


    // mostra a descrição do clima
    document.querySelector('#temp_description').innerHTML = `${json.description}`;


    // mostra temperatura máxima
    document.querySelector('#temp_max').innerHTML =
        `${json.tempMax.toFixed(1).toString().replace('.', ',')} <sup>C°</sup>`;


    // mostra temperatura mínima
    document.querySelector('#temp_min').innerHTML =
        `${json.tempMin.toFixed(1).toString().replace('.', ',')} <sup>C°</sup>`;


    // mostra a umidade do ar
    document.querySelector('#humidity').innerHTML = `${json.humidity}%`;


    // mostra a velocidade do vento
    document.querySelector('#wind').innerHTML = `${json.windSpeed.toFixed(1)}km/h`;
}


// função que mostra mensagens de alerta na tela
function showAlert(msg) {

    // coloca a mensagem dentro da div #alert
    document.querySelector('#alert').innerHTML = msg;
}