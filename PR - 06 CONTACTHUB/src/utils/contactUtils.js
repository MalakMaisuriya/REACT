export const initials = c => (c.first[0] + c.last[0]).toUpperCase();
export const fullName = c => `${c.first} ${c.last}`;
export const mailTo = (c) =>
  `mailto:${c.email}?subject=${encodeURIComponent("Message from Google Contacts")}&body=${encodeURIComponent(`Record ID: ${c.id}\n\nHi ${c.first},\n`)} `;
const COLORS = ['#1a73e8', '#ea4335', '#34a853', '#fbbc04', '#ab47bc', '#ef6c00', '#00838f', '#c62828', '#2e7d32', '#1565c0'];
export const colorFor = name => COLORS[(name.charCodeAt(0) + (name.charCodeAt(1) || 0)) % COLORS.length];
