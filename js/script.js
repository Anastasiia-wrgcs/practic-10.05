const HOST = 'http://api-messenger.web-srv.local';
const CONTENT = document.querySelector('.content');
var TOKEN = "";


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


    _post ({url: 'modules/registration.html'}, function(response) {
        CONTENT.innerHTML = response;
        LoadPageChats()
        OnLoadPageAuth()
    })


function LoadPageChats() {
    document.querySelector('.btn-4').addEventListener('click', function() {
        var edata = new FormData();
        edata.append('fam', document.querySelector('input[name="fam"]').value)
        edata.append('name', document.querySelector('input[name="name"]').value)
        edata.append('otch', document.querySelector('input[name="otch"]').value)
        edata.append('email', document.querySelector('input[name="email"]').value)
        edata.append('pass', document.querySelector('input[name="pass"]').value)

        var xhr = new XMLHttpRequest();
        xhr.open('POST', `${HOST}/user/`);
        xhr.send(edata);
        xhr.onreadystatechange = function() {
            if(xhr.readyState == 4) {
            if (xhr.status == 200) {
                OnLoadPageChats()
            } if (xhr.status == 422) {
                var response = JSON.parse(xhr.response)
                alert(response .message)
              }   
            }
        }
    })
}


function OnLoadPageChats() {
    _post ({url: 'modules/chat.html'}, function(response) {
            CONTENT.innerHTML = response;
    })
}


function OnLoadPageAuth() {
    document.querySelector('.btn-1').addEventListener('click', function() {
        _post({url: 'modules/authorization.html'}, function(response) {
            CONTENT.innerHTML = response;
            OnLoadPageReg()
            OnLoadPageChatsAuth()

        })
    })
}


function OnLoadPageReg() {
    document.querySelector('.btn-2').addEventListener('click', function() {
        _post({url: 'modules/registration.html'}, function(response) {
            CONTENT.innerHTML = response;
            LoadPageChats()
            OnLoadPageAuth()
            OnLoadPageChatsAuth()
        })
    })
}


function OnLoadPageChatsAuth() {
    document.querySelector('.btn-5').addEventListener('click', function() {
        var rdata = new FormData()
        rdata.append('email', document.querySelector('input[name="email"]').value)
        rdata.append('pass', document.querySelector('input[name="pass"]').value)
        var xhr = new XMLHttpRequest();

        xhr.open('POST', `${HOST}/auth/`);
        xhr.send(rdata);
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