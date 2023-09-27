document.addEventListener('DOMContentLoaded', function () {
    const rooms = document.querySelectorAll('.room');
    const checkoutButton = document.getElementById('checkout-button');
    const selectionModal = document.getElementById('selection-modal');
    const selectedRoomsContainer = document.getElementById('selected-rooms');
    const updateSelectionButton = document.getElementById('update-selection-button');
    const closeModalButton = document.querySelector('.close');

    const selectedRooms = [];

    rooms.forEach(room => {
        room.addEventListener('click', function () {
            if (!room.classList.contains('booked')) {
                // Toggle the room's availability status
                room.classList.toggle('available');
                room.classList.toggle('selected');

                // Update selectedRooms array
                const roomId = room.getAttribute('data-room-id');
                const index = selectedRooms.indexOf(roomId);
                if (index === -1) {
                    selectedRooms.push(roomId);
                } else {
                    selectedRooms.splice(index, 1);
                }

                // Enable or disable the checkout button based on room selections
                checkoutButton.disabled = selectedRooms.length === 0;

                // Update the selected rooms displayed in the modal
                updateSelectedRoomsDisplay();
            }
        });
    });

    function updateSelectedRoomsDisplay() {
        selectedRoomsContainer.innerHTML = '';
        if (selectedRooms.length === 0) {
            selectedRoomsContainer.innerHTML = '<p>No rooms selected.</p>';
        } else {
            selectedRooms.forEach(roomId => {
                const roomName = document.querySelector(`[data-room-id="${roomId}"]`).textContent;
                const selectedRoomDiv = document.createElement('div');
                selectedRoomDiv.textContent = roomName;
                selectedRoomsContainer.appendChild(selectedRoomDiv);
            });
        }
    }

    // Show the modal when the "Edit Selection" button is clicked
    checkoutButton.addEventListener('click', function () {
        selectionModal.style.display = 'block';
        updateSelectedRoomsDisplay();
    });

    // Close the modal when the "X" button is clicked
    closeModalButton.addEventListener('click', function () {
        selectionModal.style.display = 'none';
    });

    // Close the modal if the user clicks outside of it
    window.addEventListener('click', function (e) {
        if (e.target === selectionModal) {
            selectionModal.style.display = 'none';
        }
    });

    // Update the selection and close the modal when the "Update Selection" button is clicked
    updateSelectionButton.addEventListener('click', function () {
        // You can add your logic here to update the server-side selection data if needed
        // For this example, we're simply closing the modal
        selectionModal.style.display = 'none';
    });
});
