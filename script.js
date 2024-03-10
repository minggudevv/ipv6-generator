function generateIPv6() {
    const count = parseInt(document.getElementById('ipCount').value);
    if (isNaN(count) || count <= 0) {
        alert('Please enter a valid number greater than 0.');
        return;
    }

    document.getElementById('loading').classList.remove('hidden');
    document.getElementById('output').value = '';

    let currentIndex = 0;
    const generateNextIP = () => {
        if (currentIndex < count) {
            const segments = [];
            for (let j = 0; j < 8; j++) {
                segments.push(Math.floor(Math.random() * 65536).toString(16));
            }
            const ip = segments.join(':') + '\n';
            document.getElementById('output').value += ip;
            currentIndex++;
            setTimeout(generateNextIP, 5); // Generate next IP after 10ms
        } else {
            document.getElementById('loading').classList.add('hidden');
        }
    };

    generateNextIP();
}

function copyToClipboard() {
    const output = document.getElementById('output');
    output.select();
    document.execCommand('copy');
    alert('Copied to clipboard!');
}

function downloadTxt() {
    const output = document.getElementById('output').value;
    const blob = new Blob([output], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ipv6_addresses.txt';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
}
