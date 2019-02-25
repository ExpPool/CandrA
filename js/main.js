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
        $('#gender-select').html(gender_opt);

        
    })

});