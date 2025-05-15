const HOST = 'http://api-messenger.web-srv.local';
const CONTENT = document.querySelector('.content');
var TOKEN = ""


function _get(params, callback) {
    var HTTP_REQUEST = new XMLHttpRequest();
    HTTP_REQUEST.open('GET', `${params.url}`);
    HTTP_REQUEST.send();
    HTTP_REQUEST.onreadystatechange = function() {
        if(HTTP_REQUEST.readyState == 4) {
            callback(HTTP_REQUEST.responseText);
        }
    }
}

function _post (params, callback) {
    var HTTP_REQUEST = new XMLHttpRequest();
    HTTP_REQUEST.open('POST', `${params.url}`);
    HTTP_REQUEST.send(params.data);
    HTTP_REQUEST.onreadystatechange = function() {
        if(HTTP_REQUEST.readyState == 4) {
            callback(HTTP_REQUEST.responseText);
        }
    }
}

    _post ({url: 'modules/registration.html'}, function(responseText) {
        CONTENT.innerHTML = responseText
    })
        LoadPageAuth()
        LoadPageChat()


function LoadPageAuth() {
    document.querySelector('.registr').addEventListener('click', function() {
        var request_data = new FormData();
        request_data.append('fam', document.querySelector('input[name="FAM"]').value)
        request_data.append('ima', document.querySelector('input[name="ima"]').value)
        request_data.append('E-mail', document.querySelector('input[name="E-mail"]').value)
        request_data.append('parol', document.querySelector('input[name="parol"]').value)

        var xhr = new XMLHttpRequest();
        xhr.open('post', `${HOST}/USER/`);
        xhr.send(request_data);
        xhr.onreadystatechange = function() {
            if (xhr.status == 200) {
                OnLoadPageChat()
            } if (xhr.status == 422) {
                var response = JSON.parse(xhr.responseText)
                alert(response.message)
            }
        }
    })
}


