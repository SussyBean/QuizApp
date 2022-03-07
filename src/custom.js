setTimeout(function() {
    var myModalEl = document.getElementById('exampleModal')
    myModalEl.addEventListener('hidden.bs.modal', function(_event) {
        document.getElementById("myForm").reset();
    })
}, 100);
