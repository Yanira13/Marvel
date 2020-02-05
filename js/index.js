$(document).ready(function () {
    $('#text').keyup(function () {
        var valor = $('input').val();
        var select = $('select').val();
        $('#contenedor').empty();
        if (select == "comic")
            cogerComic(valor)
        else
            cogerPersonaje(valor)
    });
    $('select').on('change',function(){
        $('#contenedor').empty();
    })
});
const spinner = $("img").first();
spinner.hide();



function cogerPersonaje(valor) {
    var name;
    if(valor)
        name='nameStartsWith='+valor+'&';
    else
        name='';
    $('#contenedor').pagination({
        dataSource: function(done){
            $.ajax( {
                url:'https://gateway.marvel.com:443/v1/public/characters?'+name+'apikey=67ff8c89c7fc4e10022cd10d6a7703d0',
                type:'GET',
                beforeStart: () => {
                    spinner.show();
                },
                complete: () => {
                    spinner.hide();
                },
                success: response => {
                    done(response.data.results);
                },
                error : () => { //función error
                    alert('Disculpe, existió un problema');
                 }
            })
        },
        locator: 'items',
        totalNumber: 20,
        pageSize: 10,
        ajax: {
            beforeSend: function() {
                dataContainer.html('Loading data from flickr.com ...');
            }

        },
        callback: function (data, pagination) {
            // template method of yourself
            borrar();
            mostrar(data);
        }
    })
}

function cogerComic(valor) {
    var name;
    if(valor){
        if(isNaN(valor))
            name='dateRange='+valor+'&';
        else
            name='titleStartsWith='+valor+'&';
    }  
    else
        name='';
    $('#contenedor').pagination({
        dataSource: function(done){
            $.ajax( {
                url:'https://gateway.marvel.com:443/v1/public/comics?'+name+'apikey=67ff8c89c7fc4e10022cd10d6a7703d0',
                type:'GET',
                beforeStart: () => {
                    spinner.show();
                },
                complete: () => {
                    spinner.hide();
                },
                success: response => {
                    done(response.data.results);
                },
                error : () => { //función error
                    alert('Disculpe, existió un problema');
                 }
            })
        },
        locator: 'items',
        totalNumber: 20,
        pageSize: 10,
        ajax: {
            beforeSend: function() {
                dataContainer.html('Loading data from flickr.com ...');
            }

        },
        callback: function (data, pagination) {
            // template method of yourself
            borrar();
            mostrarComic(data);
        }
    })
}

function mostrar(respuesta) {
    respuesta.map(elem => {
        $('#contenedor').append('<div class="marvel'+elem.id+'"></div>');
        $('.marvel'+elem.id).append('<center></center>')
        $('.marvel'+elem.id +' center').append('<img src="' + elem.thumbnail.path + '.' + elem.thumbnail.extension + ' " width="200em"/>');
        $('.marvel'+elem.id +' center').append('<p>Nombre: ' + elem.name + '</p>');
        leerMasMenos();
    });
}

function mostrarComic(respuesta) {
respuesta.map(elem => {
    $('#contenedor').append('<div class="marvel'+elem.id+'"></div>');
    $('.marvel'+elem.id).append('<center></center>')
        $('.marvel'+elem.id +' center').append('<img src="' + elem.thumbnail.path + '.' + elem.thumbnail.extension + ' " width="200em"/>');
        $('.marvel'+elem.id +' center').append('<p>Nombre: ' + elem.title + '</p>');
        if (elem.description != null) {
            $('.marvel'+elem.id +' center').append('<p class="description">Descripción: ' + elem.description + '</p>');
           leerMasMenos();
        }

    });
}

function borrar() {
    var nodo =$('div[class^=marvel]');
    while ($('#contenedor').children().is(nodo)) {
      nodo.remove()
    }
  }

function leerMasMenos(){
     $('.description').expander({
                slicePoint: 50, // si eliminamos por defecto es 100 caracteres
                expandText: 'Leer más', // por defecto es 'read more...'
                collapseTimer: 5000, // tiempo de para cerrar la expanción si desea poner 0 para no cerrar
                userCollapseText: 'Ver menos' // por defecto es 'read less...'
              });
}