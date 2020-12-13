let lastXPosition, holdingSpeed, isGrabbingScroller = false, scrollXVelocity = 0;


const handle = (em) => {
    let scroller = em, options = {};

    // Smooth scrolling for the element.
    const scrollFrameUpdate = () => {
        if (typeof requestAnimationFrame !== 'undefined') {

            // Requests a animation frame for this function.
            requestAnimationFrame(scrollFrameUpdate); 

            // If the velocity is greater or less than 0, increase or decrease the value by 0.1.
            if (scrollXVelocity > 0.1) {
                scrollXVelocity -= 0.1;
            } else {
                scrollXVelocity += 0.1;
            }

            // Update the scroller.
            scroller.scrollLeft += scrollXVelocity;
        }
    }

    // Event when the user is holding the mouse button down.
    scroller.On("mousedown", function (e) {
        isGrabbingScroller = true;
        lastXPosition = e.offsetX;

        this.startx = e.clientX + this.scrollLeft;
        this.a = 0;
    });

    // Event when the user stopped holding the mouse button.
    scroller.On("mouseup", function () {
        isGrabbingScroller = false;
        lastXPosition = undefined;
        scrollXVelocity = scrollXVelocity / 5;
    });

    // Event when the user is moving with the mouse on the container.
    scroller.On("mousemove", function (e) {

        // If the user is holding the mouse button.
        if (isGrabbingScroller) {

            // If lastXPostition is not undefined.
            if (lastXPosition !== undefined)
            {
                // Calculate the speed.
                let a = (this.startx - (e.clientX + this.scrollLeft));

                // Update the speed;
                scrollXVelocity = a;
                holdingSpeed = a;
            }
        }
    });

    // Call the animator.
    scrollFrameUpdate();
} 

export { handle };