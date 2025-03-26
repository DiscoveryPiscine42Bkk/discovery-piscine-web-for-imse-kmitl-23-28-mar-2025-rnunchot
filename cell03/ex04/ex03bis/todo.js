$(document).ready(function() {
    const $ft_list = $("#ft_list");
    const FirstKey = "FirstOpen";
   
    function createTodo() {
        const txt = prompt("NewList:");
        if (txt) {
            const name = new Date().getTime();
            
            Cookies.set(name, txt);
            
            const $node = $("<div>").text(txt).click(function() {
                if (confirm("Do you want to delete")) {
                    $(this).remove();
                    Cookies.remove(name);
                }
            });
            
            $ft_list.prepend($node);
        }
    }
      
    if (Cookies.get(FirstKey)) {
        Object.keys(Cookies.get()).forEach(key => {
            if (key !== FirstKey) {
                Cookies.remove(key);
            }
        });
        Cookies.set(FirstKey, "true", { expires: 1 });
    } else {
        
        Object.keys(Cookies.get()).forEach(function(key) {
            if (key !== FirstKey) {
                const $node = $("<div>").text(Cookies.get(key)).click(function() {
                    if (confirm("Do you want to delete?")) {
                        $(this).remove();
                        Cookies.remove(key);
                    }
                });
                $ft_list.prepend($node);
            }
        });
    }

    $("#new").click(createTodo);
});