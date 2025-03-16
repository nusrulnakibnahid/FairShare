document.addEventListener('DOMContentLoaded', function() {
    const billAmount = document.getElementById('billAmount');
    const tipButtons = document.querySelectorAll('.btn-group .btn');
    const customTipInput = document.getElementById('customTipInput');
    const customTipButton = document.getElementById('customTip');
    const numPeople = document.getElementById('numPeople');
    const tipAmount = document.getElementById('tipAmount');
    const totalAmount = document.getElementById('totalAmount');
    const resetBtn = document.getElementById('resetBtn');

    let selectedTip = 0;

    tipButtons.forEach(button => {
        button.addEventListener('click', function() {
            tipButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            selectedTip = parseFloat(this.getAttribute('data-tip')) || 0;
            customTipInput.classList.add('d-none');
            calculate();
        });
    });

    customTipButton.addEventListener('click', function() {
        tipButtons.forEach(btn => btn.classList.remove('active'));
        customTipInput.classList.remove('d-none');
        selectedTip = 0;
    });

    customTipInput.addEventListener('input', function() {
        selectedTip = parseFloat(this.value) || 0;
        calculate();
    });

    billAmount.addEventListener('input', calculate);
    numPeople.addEventListener('input', calculate);

    resetBtn.addEventListener('click', function() {
        billAmount.value = '';
        numPeople.value = '';
        customTipInput.value = '';
        customTipInput.classList.add('d-none');
        tipButtons.forEach(btn => btn.classList.remove('active'));
        selectedTip = 0;
        calculate();
    });

    function calculate() {
        const bill = parseFloat(billAmount.value) || 0;
        const people = parseFloat(numPeople.value) || 1;

        const tip = (bill * selectedTip) / 100;
        const total = (bill + tip) / people;

        tipAmount.value = `$${(tip / people).toFixed(2)}`;
        totalAmount.value = `$${total.toFixed(2)}`;
    }
});