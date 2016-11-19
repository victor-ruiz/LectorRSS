
exports.vtn = function(titulo,url){
	var ventana=Ti.UI.createWindow({
			title:titulo,
			backgroundImage:'/imagenes/fondo5.png'
			//backgroundColor:'#C8C8C8'
	});	
	var xhr = Ti.Network.createHTTPClient({
		 timeout : 5000,
	});
	xhr.open("GET", url);
	var data = [];
	var sections=[];
	var urls=[];
	var titulos=[];
	///////////
	////////
	xhr.onload=function(){
		//alert(this.responseText);
		var xml = this.responseXML.documentElement;
		
		var items = xml.getElementsByTagName("item");
		
		var doctitle = xml.evaluate("//channel/title/text()").item(0).nodeValue;
		for (var i=0; i < items.length; i++) {
			data.push({
				properties : {
				//	image: '/imagenes/star3.png',
					title : items.item(i).getElementsByTagName("title").item(0).text,
					subtitle: items.item(i).getElementsByTagName("link").item(0).text,
					height : '150px',
					color : 'black',
					left: 15,
					accessoryType: Ti.UI.LIST_ACCESSORY_TYPE_DISCLOSURE
				},
				template: Ti.UI.LIST_ITEM_TEMPLATE_DEFAULT
			}); 
			urls[i]=items.item(i).getElementsByTagName("link").item(0).text;
			titulos[i]=items.item(i).getElementsByTagName("title").item(0).text;
		}; 
		
		var section = Ti.UI.createListSection({items:data});
		sections.push(section);
		//console.log('ya cargue a la lista');
		
		var lista = Ti.UI.createListView({
			sections:sections	
		});
		ventana.add(lista);
		
		lista.addEventListener('itemclick',function(e){
			var titulo=titulos[e.itemIndex];
			var link=urls[e.itemIndex];
			var wb=null;
			var win = Ti.UI.createWindow({
				title:titulo,
				activity:{
					onCreateOptionsMenu : function(e){
						var menuItemRecargar = e.menu.add({ title:'Recargar'});
						menuItemRecargar.addEventListener('click',function(e){
							wb.reload();
						});
						
						var menuItemAñadirF = e.menu.add({ title:'Añadir en Favoritos'});
						menuItemAñadirF.addEventListener('click',function(e){
							var db = Ti.Database.open('RSSBD');
							db.execute('INSERT INTO favoritos (titulo,link) VALUES(?,?)',titulo,link);
							alert('Se ha añadido a Favoritos');
							
							db.close();
						}); 
						
						var menuItemCompartir = e.menu.add({ title:'compartir'});
						menuItemCompartir.addEventListener('click',function(e){
							
							var activity = Ti.Android.currentActivity;
							var intent = Ti.Android.createIntent({
							            action: Ti.Android.ACTION_SEND,
							            type: 'text/plain'
							        });
		
							intent.putExtra(Ti.Android.EXTRA_TEXT, link);
							intent.putExtra(Ti.Android.EXTRA_TITLE, 'Título');
							intent.putExtra(Ti.Android.EXTRA_SUBJECT,'Título');
							activity.startActivity(Ti.Android.createIntentChooser(intent,'Share'));	﻿	
							
						});
						 
						
						
					}
				}
			});
			
			wb = Ti.UI.createWebView({url:link});
			
			win.add(wb);
						
			win.open();
		});
	};
	xhr.onerror=function(e){
		Ti.API.debug(e.error);
		alert('error en la conexion, intentelo mas tarde '+titulo);
	};
	//finally, execute the call to the remote feed
	xhr.send();
	
	return ventana;
};


function getFavoritos(){
	
	//var db= Ti.Database.open('RSSBD');
	var db= Ti.Database.install('/mydata/RSSBD.sqlite','RSSBD');	
	var sql = 'SELECT * FROM favoritos';
	var results = [];
	var resulSet = db.execute(sql);
	
	while(resulSet.isValidRow()){
		results.push({
			id:resulSet.fieldByName('idFavoritos'),
			titulo:resulSet.fieldByName('titulo'),
			link:resulSet.fieldByName('link')
		});
		//alert(results.toString);
		resulSet.next();
	}
	
	resulSet.close();
	db.close();
	return results;
};


exports.vtnFavoritos=function(){
	var ventana = Titanium.UI.createWindow({  
	    title:'Favoritos',
	    backgroundImage:'/imagenes/fondo5.png'
	    //backgroundColor:'#C8C8C8'
	});
	var cargar = function(){
		var datos = [];
		var sections=[];
		var titulos=[];
		var urls=[];
		
		for (var i=0; i < getFavoritos().length; i++) {
			titulos[i]=getFavoritos()[i].titulo;
			urls[i]=getFavoritos()[i].link;
			datos.push({
				properties : {
					image: '/imagenes/star3.png',
					title : getFavoritos()[i].titulo,
					subtitle: getFavoritos()[i].link,
					height : '150px',
					color : 'black',
					left: 15,
					accessoryType: Ti.UI.LIST_ACCESSORY_TYPE_DISCLOSURE
				},
				template: Ti.UI.LIST_ITEM_TEMPLATE_DEFAULT
			});
		}
		var section = Ti.UI.createListSection({items:datos});
		sections.push(section);
		
		var lista = Ti.UI.createListView({
			sections:sections	
		});
		ventana.add(lista);
		
		lista.addEventListener('itemclick',function(e){
			var titulo=titulos[e.itemIndex];
			var link=urls[e.itemIndex];
			var wb = Ti.UI.createWebView({url:link});
			var win = Ti.UI.createWindow({
				title:titulo,
				activity:{
					onCreateOptionsMenu : function(e){
						var menuItemRecargar = e.menu.add({ title:'Recargar'});
						menuItemRecargar.addEventListener('click',function(e){
							wb.reload();
						});
						var menuItemCompartir = e.menu.add({ title:'compartir'});
						menuItemCompartir.addEventListener('click',function(e){
							
							var activity = Ti.Android.currentActivity;
							var intent = Ti.Android.createIntent({
							            action: Ti.Android.ACTION_SEND,
							            type: 'text/plain'
							        });
		
							intent.putExtra(Ti.Android.EXTRA_TEXT, link);
							intent.putExtra(Ti.Android.EXTRA_TITLE, 'Título');
							intent.putExtra(Ti.Android.EXTRA_SUBJECT,'Título');
							activity.startActivity(Ti.Android.createIntentChooser(intent,'Share'));	﻿	
							
						});
		
						
						
					}
				}
			});
			
			
			win.add(wb);
						
			win.open();
		});
		
	};
	
	ventana.addEventListener('open',function(e){
	
			cargar();
	});
	
	return ventana;
};



