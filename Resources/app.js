var lib = require('iu');

Titanium.UI.setBackgroundColor('#000');

var ventana = Titanium.UI.createWindow({  
    title:'Bienvenidos',
    backgroundImage:'/imagenes/fondo5.png'
    //backgroundColor:'#C8C8C8'
});

ventana.addEventListener('open',function(e){
	//instalamos la BD
	var db= Ti.Database.install('/mydata/RSSBD.sqlite','RSSBD');	
	//alert('si conecto la BD');
	//se cierra la BD
	db.close();
});
	
var vista=Ti.UI.createScrollView({
		backgroundColor : 'transparent',
		top: 5
	});
	
ventana.add(vista);
	
var botonNoticias = Ti.UI.createButton({
		title:'Noticias',
		font:{fontSize:18,fontFamily:'Helvetica Neue',fontWeight:'blod'},
		color:'black',
		backgroundImage: '/imagenes/Icon-news.png',
		top: 20,
    	width: 100,
    	height: 100,
    	left: '10%'
	});
	
botonNoticias.addEventListener('click',function(e){
	var vtnN = lib.vtn('Noticias',"http://archivo.eluniversal.com.mx/rss/universalmxm.xml");
	console.log('->'+e.error);
	vtnN.open();
});

var botonFavoritos = Ti.UI.createButton({
	
	title:'Favoritos',
	color:'black',
	font:{fontSize:18,fontFamily:'Helvetica Neue',fontWeight:'blod'},
	backgroundImage: '/imagenes/folder-favorites-icon.png',
	top: 20,
    width: 100,
    height: 100,
    right: '10%'
});

botonFavoritos.addEventListener('click',function(e){
	var vtnF = lib.vtnFavoritos();
	vtnF.open(); 
});


var botonDeportes = Ti.UI.createButton({
	title:'Deportes',
	color:'black',
	opacity:0.8,
	font:{fontSize:15,fontFamily:'Helvetica Neue',fontWeight:'blod'},
	backgroundImage: '/imagenes/Sport_balls.png',
	top: 150,
    width: 100,
    height: 100,
    left: '10%'
});

botonDeportes.addEventListener('click',function(e){
	var vtnD = lib.vtn('Deportes','http://www.jornada.unam.mx/rss/deportes.xml?v=1');
	
	vtnD.open();
});

var botonCiencia = Ti.UI.createButton({
	title:'Ciencia',
	color:'black',
	font:{fontSize:18,fontFamily:'Helvetica Neue',fontWeight:'blod'},
	backgroundImage: '/imagenes/fiestaicono.png',
	opacity:0.8,
	top: 150,
    width: 100,
    height: 100,
    right: '10%'
});

botonCiencia.addEventListener('click',function(e){
	var vtnCiencia = lib.vtn('Ciencia','http://www.microsiervos.com/ciencia.xml');
	console.log('->'+e.error);
	vtnCiencia.open();
});

var botonTecnologia = Ti.UI.createButton({
	title:'Tecnologia',
	color:'black',
	font:{fontSize:15,fontFamily:'Helvetica Neue',fontWeight:'blod'},
	backgroundImage: '/imagenes/Robot.png',
	top: 300,
    width: 100,
    height: 100,
    left: '10%'
});

botonTecnologia.addEventListener('click',function(e){
	var vtnT = lib.vtn('Tecnologia','http://www.microsiervos.com/tecnologia.xml');
	vtnT.open();
});

var botonCine = Ti.UI.createButton({
	title:'Cine',
	color:'black',
	font:{fontSize:18,fontFamily:'Helvetica Neue',fontWeight:'blod'},
	backgroundImage: '/imagenes/cinema.png',
	top: 300,
    width: 100,
    height: 100,
    right: '10%'
});

botonCine.addEventListener('click',function(e){
	var vtnCine = lib.vtn('Peliculas','http://www.microsiervos.com/peliculas-tv.xml');
	vtnCine.open();
});
/////
var botonAnime = Ti.UI.createButton({
	title:'Anime',
	font:{fontSize:18,fontFamily:'Helvetica Neue',fontWeight:'blod'},
	backgroundImage: '/imagenes/Death_Note.png',
	top: 450,
    width: 100,
    height: 100,
    left: '10%'
});

botonAnime.addEventListener('click',function(e){
	var vtnT = lib.vtn('Anime y Manga','http://www.mininova.org/rss.xml?cat=1');
	vtnT.open();
});

var botonEconomia = Ti.UI.createButton({
	title:'Economia',
	color:'black',
	font:{fontSize:15,fontFamily:'Helvetica Neue',fontWeight:'blod'},
	backgroundImage: '/imagenes/money.png',
	top: 450,
    width: 100,
    height: 100,
    right: '10%'
});

botonEconomia.addEventListener('click',function(e){
	var vtnCine = lib.vtn('Economia','http://www.jornada.unam.mx/rss/economia.xml?v=1');
	vtnCine.open();
});


///
vista.add(botonNoticias);
vista.add(botonFavoritos);
vista.add(botonDeportes);
vista.add(botonCiencia);
vista.add(botonCine);
vista.add(botonTecnologia);
vista.add(botonAnime);
vista.add(botonEconomia);

ventana.open();


