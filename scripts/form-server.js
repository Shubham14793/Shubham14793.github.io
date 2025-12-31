/**
 * Contact Form Handler Server
 * Receives form submissions and saves to CSV
 * 
 * Usage: node scripts/form-server.js
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3001;
const CSV_FILE = path.join(__dirname, '../connections/messages.csv');

// Ensure CSV file exists with headers
function ensureCSVExists() {
    if (!fs.existsSync(CSV_FILE)) {
        fs.writeFileSync(CSV_FILE, 'timestamp,name,email,subject,budget,message,status\n');
    }
}

// Escape CSV field
function escapeCSV(field) {
    if (field === null || field === undefined) return '';
    const str = String(field);
    if (str.includes(',') || str.includes('"') || str.includes('\n')) {
        return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
}

// Parse form data
function parseFormData(body) {
    try {
        return JSON.parse(body);
    } catch (e) {
        // Handle URL-encoded form data
        const params = new URLSearchParams(body);
        return Object.fromEntries(params);
    }
}

// Handle form submission
function handleSubmission(req, res) {
    let body = '';
    
    req.on('data', chunk => {
        body += chunk.toString();
    });
    
    req.on('end', () => {
        try {
            const data = parseFormData(body);
            
            // Create CSV row
            const timestamp = new Date().toISOString();
            const row = [
                escapeCSV(timestamp),
                escapeCSV(data.name),
                escapeCSV(data.email),
                escapeCSV(data.subject),
                escapeCSV(data.budget || 'Not specified'),
                escapeCSV(data.message),
                'new'
            ].join(',') + '\n';
            
            // Append to CSV
            ensureCSVExists();
            fs.appendFileSync(CSV_FILE, row);
            
            console.log(`✅ New message from: ${data.name} <${data.email}>`);
            
            // Send success response
            res.writeHead(200, {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            });
            res.end(JSON.stringify({ success: true, message: 'Message saved successfully!' }));
            
        } catch (error) {
            console.error('❌ Error saving message:', error);
            res.writeHead(500, {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            });
            res.end(JSON.stringify({ success: false, message: 'Error saving message' }));
        }
    });
}

// Get all messages
function getMessages(req, res) {
    ensureCSVExists();
    
    try {
        const csvContent = fs.readFileSync(CSV_FILE, 'utf8');
        const lines = csvContent.trim().split('\n');
        const headers = lines[0].split(',');
        
        const messages = [];
        for (let i = 1; i < lines.length; i++) {
            if (lines[i].trim()) {
                // Parse CSV line (handle quoted fields)
                const values = parseCSVLine(lines[i]);
                const message = {};
                headers.forEach((header, index) => {
                    message[header] = values[index] || '';
                });
                messages.push(message);
            }
        }
        
        // Sort by timestamp descending (newest first)
        messages.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        
        res.writeHead(200, {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        });
        res.end(JSON.stringify(messages));
        
    } catch (error) {
        console.error('❌ Error reading messages:', error);
        res.writeHead(500, {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        });
        res.end(JSON.stringify({ error: 'Error reading messages' }));
    }
}

// Parse CSV line handling quoted fields
function parseCSVLine(line) {
    const values = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        
        if (char === '"') {
            if (inQuotes && line[i + 1] === '"') {
                current += '"';
                i++;
            } else {
                inQuotes = !inQuotes;
            }
        } else if (char === ',' && !inQuotes) {
            values.push(current);
            current = '';
        } else {
            current += char;
        }
    }
    values.push(current);
    
    return values;
}

// Update message status
function updateStatus(req, res) {
    let body = '';
    
    req.on('data', chunk => {
        body += chunk.toString();
    });
    
    req.on('end', () => {
        try {
            const { timestamp, status } = JSON.parse(body);
            
            const csvContent = fs.readFileSync(CSV_FILE, 'utf8');
            const lines = csvContent.split('\n');
            
            for (let i = 1; i < lines.length; i++) {
                if (lines[i].includes(timestamp)) {
                    const values = parseCSVLine(lines[i]);
                    values[6] = status; // Update status column
                    lines[i] = values.map(v => escapeCSV(v)).join(',');
                    break;
                }
            }
            
            fs.writeFileSync(CSV_FILE, lines.join('\n'));
            
            res.writeHead(200, {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            });
            res.end(JSON.stringify({ success: true }));
            
        } catch (error) {
            console.error('❌ Error updating status:', error);
            res.writeHead(500, {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            });
            res.end(JSON.stringify({ error: 'Error updating status' }));
        }
    });
}

// Create server
const server = http.createServer((req, res) => {
    // Handle CORS preflight
    if (req.method === 'OPTIONS') {
        res.writeHead(200, {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
        });
        res.end();
        return;
    }
    
    const url = req.url.split('?')[0];
    
    if (url === '/api/contact' && req.method === 'POST') {
        handleSubmission(req, res);
    } else if (url === '/api/messages' && req.method === 'GET') {
        getMessages(req, res);
    } else if (url === '/api/messages/status' && req.method === 'PUT') {
        updateStatus(req, res);
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Not found' }));
    }
});

// Start server
ensureCSVExists();
server.listen(PORT, () => {
    console.log(`\n📬 Contact Form Server running on http://localhost:${PORT}`);
    console.log(`\nEndpoints:`);
    console.log(`  POST /api/contact     - Submit contact form`);
    console.log(`  GET  /api/messages    - Get all messages`);
    console.log(`  PUT  /api/messages/status - Update message status`);
    console.log(`\nMessages saved to: ${CSV_FILE}\n`);
});
