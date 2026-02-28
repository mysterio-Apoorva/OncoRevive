document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    lucide.createIcons();

    // Setup navbar scroll effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    });

    // Accordion Logic
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const isActive = item.classList.contains('active');
            
            // Close all
            document.querySelectorAll('.accordion-item').forEach(acc => {
                acc.classList.remove('active');
            });

            // Open clicked if not already active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // Tabs Logic
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');
            
            // Remove active class from all
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));

            // Add to targeted
            btn.classList.add('active');
            document.getElementById(`tab-${targetTab}`).classList.add('active');
        });
    });

    // Simulate Rescue Logic (Pharma View)
    const btnSimulate = document.getElementById('btn-simulate-rescue');
    const pharmaResults = document.getElementById('pharma-results');
    const pharmaPlaceholder = document.getElementById('pharma-placeholder');

    if (btnSimulate) {
        btnSimulate.addEventListener('click', () => {
            btnSimulate.innerHTML = '<i data-lucide="loader-2" class="spin" style="animation: spin 1s linear infinite;"></i> Processing...';
            lucide.createIcons();
            btnSimulate.disabled = true;

            setTimeout(() => {
                pharmaPlaceholder.classList.add('hidden');
                pharmaResults.classList.remove('hidden');
                btnSimulate.innerHTML = 'Run Rescue Simulation';
                btnSimulate.disabled = false;
            }, 1200); // simulate 1.2s delay
        });
    }

    // Match Patients Logic (Clinical View)
    const btnMatch = document.getElementById('btn-match-patients');
    const clinicalResults = document.getElementById('clinical-results');
    const clinicalPlaceholder = document.getElementById('clinical-placeholder');

    if (btnMatch) {
        btnMatch.addEventListener('click', () => {
            btnMatch.innerHTML = '<i data-lucide="loader-2" class="spin" style="animation: spin 1s linear infinite;"></i> Matching...';
            lucide.createIcons();
            btnMatch.disabled = true;

            setTimeout(() => {
                clinicalPlaceholder.classList.add('hidden');
                clinicalResults.classList.remove('hidden');
                btnMatch.innerHTML = 'Match Patients';
                btnMatch.disabled = false;
            }, 1000);
        });
    }

    // Patient card selection
    const patientCards = document.querySelectorAll('.patient-card');
    patientCards.forEach(card => {
        card.addEventListener('click', () => {
            patientCards.forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
        });
    });

    // Sub-animation for lucide icon spin
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes spin { 100% { transform: rotate(360deg); } }
    `;
    document.head.appendChild(style);

    // Investor View Calculator Logic
    const sliderSize = document.getElementById('slider-trial-size');
    const sliderCost = document.getElementById('slider-cost');
    const sliderPos = document.getElementById('slider-pos');

    const valSize = document.getElementById('val-trial-size');
    const valCost = document.getElementById('val-cost');
    const valPos = document.getElementById('val-pos');

    const outInv = document.getElementById('out-investment');
    const outTime = document.getElementById('out-time');
    const outNpv = document.getElementById('out-npv');
    const outRoi = document.getElementById('out-roi');

    function formatCurrency(num) {
        if (num >= 1000) return '$' + (num / 1000).toFixed(2) + 'B';
        return '$' + num.toFixed(2) + 'M';
    }

    function calculateROI() {
        const size = parseInt(sliderSize.value);
        const costPerK = parseInt(sliderCost.value);
        const posPerc = parseInt(sliderPos.value) / 100;

        // Simulate logic
        valSize.textContent = size;
        valCost.textContent = costPerK;
        valPos.textContent = sliderPos.value;

        // Total investment
        const totalInvestmentM = (size * costPerK) / 1000;
        outInv.textContent = formatCurrency(totalInvestmentM);

        // Time to readout based loosely on size
        const months = Math.max(6, Math.ceil(size / 20));
        outTime.textContent = months + ' Months';

        // Fake NPV formulation for prototype
        // Base value $1B peak sales equivalent
        const riskAdjustedValue = 800 * posPerc; 
        outNpv.textContent = formatCurrency(riskAdjustedValue);

        // ROI Multiple
        const roi = (riskAdjustedValue / totalInvestmentM).toFixed(1);
        outRoi.textContent = roi + 'x';
    }

    if (sliderSize && sliderCost && sliderPos) {
        sliderSize.addEventListener('input', calculateROI);
        sliderCost.addEventListener('input', calculateROI);
        sliderPos.addEventListener('input', calculateROI);
        
        // Initial calc
        calculateROI();
    }
});
