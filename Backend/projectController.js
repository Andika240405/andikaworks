// Data proyek statis (bisa diganti dengan database)
const projects = [
  {
    id: 1,
    title: 'Website E-commerce',
    category: 'web',
    description: 'Platform belanja online dengan fitur keranjang dan pembayaran. Dibangun dengan React dan Node.js.',
    icon: 'fas fa-laptop-code',
    link: '#'
  },
  {
    id: 2,
    title: 'Toko Online Fesyen',
    category: 'web',
    description: 'Website e-commerce modern dengan Vue.js dan integrasi payment gateway.',
    icon: 'fas fa-store',
    link: '#'
  },
  {
    id: 3,
    title: 'Aplikasi Manajemen Tugas',
    category: 'mobile',
    description: 'Aplikasi mobile-friendly untuk mengatur tugas harian. Menggunakan Vue.js dan Firebase.',
    icon: 'fas fa-mobile-alt',
    link: '#'
  },
  {
    id: 4,
    title: 'TaskFlow Mobile',
    category: 'mobile',
    description: 'Aplikasi produktivitas dengan notifikasi dan integrasi kalender (React Native).',
    icon: 'fas fa-clock',
    link: '#'
  },
  {
    id: 5,
    title: 'Dashboard Analitik',
    category: 'dashboard',
    description: 'Dashboard interaktif menampilkan data real-time. Dibuat dengan Chart.js dan Express.',
    icon: 'fas fa-chart-line',
    link: '#'
  },
  {
    id: 6,
    title: 'Sales Dashboard',
    category: 'dashboard',
    description: 'Visualisasi data penjualan dengan filter interaktif dan export laporan.',
    icon: 'fas fa-chart-pie',
    link: '#'
  }
];

const getAllProjects = (req, res) => {
  res.json(projects);
};

const getProjectById = (req, res) => {
  const id = parseInt(req.params.id);
  const project = projects.find(p => p.id === id);
  if (project) {
    res.json(project);
  } else {
    res.status(404).json({ error: 'Proyek tidak ditemukan' });
  }
};

module.exports = { getAllProjects, getProjectById };