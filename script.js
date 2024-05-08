const container = document.querySelector('.container');

const seats = document.querySelectorAll('.row .seat:not(.occupied)');

const count = document.getElementById('count')
const total = document.getElementById('totalPrice')

const movieSelected = document.getElementById('movie');

populateUI()

let ticketPrice = +movieSelected.value;

function updatedSelectedCount(){
    const selectedSeats = document.querySelectorAll('.row .seat.selected');

    const seatsIndex = [...selectedSeats].map(seat =>{
        return [...seats].indexOf(seat)
    });

    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex))
    const seatCount = selectedSeats.length;

    count.innerText = seatCount;
    total.innerText = seatCount * ticketPrice;
}

function setMovieData(movieIndex, moviePrice){
    localStorage.setItem('selectedMovieIndex', movieIndex)
    localStorage.setItem('selectedMoviePrice', moviePrice)

}

function populateUI() {
    const selectedSeatsString = localStorage.getItem('selectedSeats');
    console.log('Selected seats string from localStorage:', selectedSeatsString);

    let selectedSeats = JSON.parse(selectedSeatsString);

    // Check if selectedSeats is not an array or is null
    if (!Array.isArray(selectedSeats) || selectedSeats === null) {
        selectedSeats = []; // Set selectedSeats to an empty array
    }

    console.log('Parsed selected seats array:', selectedSeats);

    seats.forEach((seat, index) => {
        console.log(`Seat index: ${index}`);
        if (selectedSeats.indexOf(index) > -1) {
            seat.classList.add('selected');
            console.log(`Added 'selected' class to seat ${index}`);
        }
    });

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    if (selectedMovieIndex !== null) {
        movieSelected.selectedIndex = selectedMovieIndex;
    }
}

container.addEventListener('click', (event) =>{
    if(event.target.classList.contains('seat') && !event.target.classList.contains('occupied')){
        event.target.classList.toggle('selected')
        updatedSelectedCount();
    }
});

movieSelected.addEventListener('change', e =>{
    ticketPrice = e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value)
    updatedSelectedCount();
})

updatedSelectedCount();
