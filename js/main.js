$(document).ready(function(){
//API
    var _url= 'http://my-json-server.typicode.com/gigihridho/latihan_pwa_api/mahasiswa';

    //menampung data yang didapat dari API
    var result = '';

    //menampung gender sebagai option
    var gender_opt ='';

    //menampung semua gender dari API
    var gender = [];

    $.get(_url,function (data) {
        $.each(data, function (key, items){
            //untuk menampung gender sementara pada loop
            _gend = items.gender;


            result += '<div>' +'<p><b>' + items.name + '</b></p>'+
                '<p>' + _gend + '</p>' + '</div>';
            
                if($.inArray(_gend, gender)=== -1){
                    //data gender di push untuk pengecekan berikutnya
                    gender.push(_gend);
                    //set gender_opt dengan <option>
                    gender_opt += '<option value="' + _gend + '">' + _gend+'</option>'
                }
        });
        // menggunakan selector ID mhs-list
        //kemudian replace html di dalam komponen yang ada di 
        //id mhs-list menjadi result
        $('#mhs-list').html(result);

        //menggunakan selector ID gender-select
        //mekemudian repcate html di dalam komponen yang
        //ada di id gender-select menjadi gender_opt
        $('#gender-select').html('<option value="semua"> Semua </option>'+gender_opt);

        
    });

    var networkDataReceive =false;
    /* cek di Cache, Apakah sudah ada belum, ngambil dari service online */
    var networkUpdate = fetch(_url).then(function(response){
        return response.json();
    }).then(function(data){
        networkDataReceive = true;
        renderPage(data)
    });
    
    /*fetch data dari cache*/ 
    caches.match(_url).then(function(response){
        if(!response) throw Error("no data on cache");
        return response.json();
    }).then(function(data) {
        if(!networkDataReceive){
            renderPage(data);
            console.log('render data from cache');
        }
    }).catch(function(){
        return networkUpdate;
    })

    
    $('#gender-select').on('change', function(){
        updateList($(this).val())
    });
        
        function updateList(opt){
            var _url2 = _url;

            if (opt !== 'semua'){
                _url2 =_url + '?gender=' +opt;
            }
            var result='';
            $.get(_url2,function (data) {
                $.each(data, function (key, items){
                    //untuk menampung gender sementara pada loop
                    _gend = items.gender;
        
                    result += '<div>' +'<p><b>' + items.name + '</b></p>'+
                        '<p>' + _gend + '</p>' + '</div>';
                });
                // menggunakan selector ID mhs-list
                //kemudian replace html di dalam komponen yang ada di 
                //id mhs-list menjadi result
                $('#mhs-list').html(result);
            
        });
    }

});
if('serviceWorker' in navigator){
    window.addEventListener('load',function(){
        navigator.serviceWorker.register('/serviceworker.js').then(function(reg){
            console.log('SW regis sukses dengan skop',reg.scope)
            }, 
                function(err){
                console.log('sw regis failed',err);
        })
    })
} 
