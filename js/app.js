window.onload = function () {
    let imageData = '';
    let ip = '127.0.0.1';

    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('#image').attr('src', e.target.result);
                imageData = e.target.result;
            }

            reader.readAsDataURL(input.files[0]);
        }
    }

    $("#imgInp").change(function () {
        readURL(this);
    });

    $("#formUploadItem").submit(function (event) {
        uploadArticle();
        event.preventDefault();
    });


    function uploadArticle() {
        let imageBase = imageData.replace("data:image/jpeg;base64,","");
        imageBase = replaceAll(imageBase,'/','%2F').replace(/\+/g,'%2B');

        // Title (Space ersetzt)
        let title = $("#articleTitle").val();
        title = replaceAll(title,' ','%20');

        // Beschreibung (Space ersetzt)
        let description = $("#articleDescription").val();
        description = replaceAll(description,' ','%20');

        let price = $("#articlePrice").val();

        if(validate()!=''){
            return;
        }

        $.ajax({
            type: "POST",
            url: "http://127.0.0.1:8080/onlineshop-web/resources/item/create",
            data: "title="+title+"&description="+description+"&price="+price+"&image="+imageBase,// now data come in this function
            contentType: "application/x-www-form-urlencoded",
            cache: "no-cache",
            success: function (data, status, jqXHR) {

                alert(data);// write success in " "
            },

            error: function (jqXHR, status) {
                // error handler
                alert('Error occured');
                console.log(jqXHR.data);
                //alert('fail' + status.code);
            }
        });
    }

    function replaceAll(str, find, replace) {
        return str.replace(new RegExp(find, 'g'), replace);
    }

    function validate() {
        var title,description,price, text;
        var errorMessage = [];

        // Get the value of the input field with id="numb"
        title = document.getElementById("articleTitle").value;
        description = document.getElementById("articleDescription").value;
        price = document.getElementById("articlePrice").value;

        if (title.length == 0) {
            errorMessage.push("Kein gültiger Titel");
        }

        if (title.length == 0) {
            errorMessage.push("Keine gültige Beschreibung");
        }

        if(isNaN(price) || price.length==0){
            errorMessage.push("Kein gültiger Preis");
        }

        let error = errorMessage.join(" - ");
        document.getElementById("demo").innerHTML = error;
        return error;
    }

    function showMessage() {
        var x = document.getElementById("successMessage");
        if (x.style.display === "none") {
            x.style.display = "block";
        } else {
            x.style.display = "none";
        }
    }
    var viewAll = document.getElementById('viewAll');

    viewAll.onclick = function(){
       getItems();
    }

    function getItems() {
        $.ajax({
            type: "GET",
            url: "http://127.0.0.1:8080/onlineshop-web/resources/item/getItems",
            data: null,
            contentType: "application/x-www-form-urlencoded",
            cache: "no-cache",
            success: function (data, status, jqXHR) {

                let tableElement = document.getElementById('artikelEntries');
                for (let item in data){
                    var _item = data[item];
                var _conent ='<tr><th scope="row">'+_item.id+'</th><td>'+_item.title+'</td><td>'+_item.description+'</td><td>'+_item.price+'</td></tr>';

                    $("table tbody").children( 'tr:not(:first)' ).remove();
                    $("table tbody").append(_conent);
                }
            },

            error: function (jqXHR, status) {
                // error handler
                alert('Error occured');
                console.log(jqXHR.data);
                //alert('fail' + status.code);
            }
        });
    }
};

