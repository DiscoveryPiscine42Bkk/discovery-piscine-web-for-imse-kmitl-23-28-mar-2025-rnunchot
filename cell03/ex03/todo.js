document.addEventListener("DOMContentLoaded", () => {
    const listContainer = document.getElementById("ft_list");
    const newTaskButton = document.getElementById("newTask");

    // โหลด To-Do จาก Cookies
    loadTasks();

    newTaskButton.addEventListener("click", () => {
        const taskText = prompt("Enter a new task:");
        if (taskText) {
            addTask(taskText);
            saveTasks();
        }
    });

    function addTask(taskText) {
        const task = document.createElement("div");
        task.className = "todo";
        task.textContent = taskText;
        task.addEventListener("click", () => {
            if (confirm("Do you want to remove this task?")) {
                task.remove();
                saveTasks();
            }
        });
        listContainer.prepend(task);
    }

    function saveTasks() {
        const tasks = [];
        document.querySelectorAll(".todo").forEach(task => {
            tasks.push(task.textContent);
        });
        document.cookie = `tasks=${JSON.stringify(tasks)}; path=/; max-age=86400`;
    }

    function loadTasks() {
        const cookies = document.cookie.split("; ");
        const taskCookie = cookies.find(row => row.startsWith("tasks="));
        if (taskCookie) {
            const tasks = JSON.parse(taskCookie.split("=")[1]);
            tasks.forEach(taskText => addTask(taskText));
        }
    }
});