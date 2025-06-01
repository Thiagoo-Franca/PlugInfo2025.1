function ativar() {
    const obj = window.document.getElementById("compartilhar");

    if (obj.style.visibility === 'hidden') {
        obj.style.visibility = 'visible';
    }
    else {
        obj.style.visibility = 'hidden';
    }
}