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
/*      start       */
    _post ({url: 'modules/registration.html'}, function(responseText) {
        CONTENT.innerHTML = responseText
    })
LoadPageAuth()


function LoadPageAuth() {
    document.querySelector('.registr').addEventListener('click', function() {
        var request_data = new FormData();
        request_data.append('fam', document.querySelector('input[name="fam"]').value)
        request_data.append('ima', document.querySelector('input[name="ima"]').value)
        request_data.append('E-mail', document.querySelector('input[name="E-mail"]').value)
        request_data.append('parol', document.querySelector('input[name="parol"]').value)

        var xhr = new XMLHttpRequest();
        xhr.open('post', `${HOST}/USER/`);
        xhr.send(request_data);
        xhr.onreadystatechange = function() {
            if (xhr.status == 200) {
                OnLoadPageChats()
            } if (xhr.status == 422) {
                var response = JSON.parse(xhr.responseText)
                alert('Login failed')
            }
        }
    })
}


function onLoadPageChats() {
    _post ({url: 'modules/chat.html'}, function(response) {
            CONTENT.innerHTML = response;
    })
}


function onLoadPageAuth() {
    document.querySelector('.authorize').addEventListener('click', function() {
        _post({url: 'modules/authorization.html'}, function(response) {
            CONTENT.innerHTML = response;
        })
    })
}
onLoadPageChatsAuth()


function onLoadPageChatsAuth() {
    document.querySelector('.authorize').addEventListener('click', function() {
        var data = new FormData()
        var email = document.querySelector('input[name = "email"]').value
        var parol = document.querySelector('input[name = "parol"]').value
        edata.append('email', email)
        edata.append('par', parol)

        var xhr = new XMLHttpRequest();
        xhr.open('POST', `${host}/auth/`);
        xhr.send(edata);
        xhr.onreadystatechange = function() {
            if (xhr.status == 200) {
                OnLoadPageChats()
            } if (xhr.status == 422) {
                var response = JSON.parse(xhr.responseText)
                alert(response.message)
            }
        }
    })
}
/*        end         */














