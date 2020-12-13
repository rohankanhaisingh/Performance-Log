export const handle = input => {

    // Event when the user entered.
    input.On("input", function () {
        let elements = $ga(".games-model");
        let value = this.innerText.toLowerCase(); // Convert the text to lower case letters.

        // If value is not empty.
        if (value !== '') {

            // Loop trough the elements.
            for (let i = 0; i < elements.length; i++) {
                let elementAttribute = elements[i].getAttribute("card-name").toLowerCase(); // Get the elements its attribute and convert it to lower case letters.

                // If the value does not match to the element attribute, add a blurry effect.
                if (elementAttribute.indexOf(value) > -1) {
                    elements[i].classList.remove("hidden");
                } else {
                    elements[i].classList.add("hidden");
                }
            }
        } else {

            // Remove the classlist for every element.
            elements.forEach(element => {
                element.classList.remove("hidden");
            });
        }
    });
}