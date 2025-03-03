document.addEventListener("DOMContentLoaded", function () {
    const monthYear = document.getElementById("month-year");
    const daysContainer = document.getElementById("calendar-days");
    const prevBtn = document.querySelector(".prev");
    const nextBtn = document.querySelector(".next");

    let currentDate = new Date();

    // Random Events (Sample Data)
    const events = {
        3: { type: "meeting", text: "Client Call at 3 PM" },
        7: { type: "reminder", text: "Follow-up with Investor" },
        15: { type: "task", text: "Submit Project Report" },
        18: { type: "meeting", text: "Product Launch Discussion" },
        22: { type: "reminder", text: "Deadline for Marketing Plan" },
        28: { type: "task", text: "Check Sales Metrics" }
    };

    function getEventColor(type) {
        if (type === "meeting") return "#6A5ACD"; // Slate Blue
        if (type === "reminder") return "#FFD700"; // Gold
        if (type === "task") return "#32CD32"; // Lime Green
        return "transparent";
    }

    function renderCalendar() {
        daysContainer.innerHTML = "";
        let firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
        let totalDays = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

        monthYear.textContent = currentDate.toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
        });

        for (let i = 0; i < firstDay; i++) {
            let emptyDiv = document.createElement("div");
            daysContainer.appendChild(emptyDiv);
        }

        for (let i = 1; i <= totalDays; i++) {
            let dayDiv = document.createElement("div");
            dayDiv.textContent = i;

            // Highlight today's date
            if (
                i === new Date().getDate() &&
                currentDate.getMonth() === new Date().getMonth() &&
                currentDate.getFullYear() === new Date().getFullYear()
            ) {
                dayDiv.classList.add("today");
            }

            // Add event if it exists
            if (events[i]) {
                dayDiv.classList.add("event-day");
                dayDiv.style.setProperty("--event-color", getEventColor(events[i].type));
                dayDiv.setAttribute("data-event", events[i].text);
            }

            daysContainer.appendChild(dayDiv);
        }
    }

    prevBtn.addEventListener("click", () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });

    nextBtn.addEventListener("click", () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });

    renderCalendar();
});
