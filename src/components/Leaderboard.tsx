import React from 'react';
import { CSSProperties } from 'react';

// Interfaz para un elemento del leaderboard
interface LeaderboardEntry {
  rank: number;
  username: string;
  score: number;
  imageUrl?: string; // URL de la imagen de perfil (opcional)
}

function Leaderboard() {
  // Datos de ejemplo del leaderboard (reemplaza esto con tus datos reales)
  const leaderboardData: LeaderboardEntry[] = [
    { rank: 1, username: 'CampeonSticker', score: 1500, imageUrl: 'https://contenthub-static.crypto.com/wp_media/2024/03/What-is-PEPE_F2.jpg' },
    { rank: 2, username: 'ReyDelSticker', score: 1400, imageUrl: 'https://contenthub-static.crypto.com/wp_media/2024/03/What-is-PEPE_F2.jpg' },
    { rank: 3, username: 'StickerPro', score: 1300, imageUrl: 'https://contenthub-static.crypto.com/wp_media/2024/03/What-is-PEPE_F2.jpg' },
    { rank: 4, username: 'StickerFan', score: 1200, imageUrl: 'https://contenthub-static.crypto.com/wp_media/2024/03/What-is-PEPE_F2.jpg' },
    { rank: 5, username: 'StickerLover', score: 1100, imageUrl: 'https://contenthub-static.crypto.com/wp_media/2024/03/What-is-PEPE_F2.jpg' },
    { rank: 6, username: 'StickerAddict', score: 1000, imageUrl: 'https://contenthub-static.crypto.com/wp_media/2024/03/What-is-PEPE_F2.jpg' },
    { rank: 7, username: 'StickerNewbie', score: 900, imageUrl: 'https://contenthub-static.crypto.com/wp_media/2024/03/What-is-PEPE_F2.jpg' },
    { rank: 8, username: 'StickerCasual', score: 800, imageUrl: 'https://contenthub-static.crypto.com/wp_media/2024/03/What-is-PEPE_F2.jpg' },
    { rank: 9, username: 'StickerExplorer', score: 700, imageUrl: 'https://contenthub-static.crypto.com/wp_media/2024/03/What-is-PEPE_F2.jpg' },
    { rank: 10, username: 'StickerBeginner', score: 600, imageUrl: 'https://contenthub-static.crypto.com/wp_media/2024/03/What-is-PEPE_F2.jpg' },
  ];

  // Función para determinar el estilo de la fila según el ranking
  const getRowStyle = (rank: number): CSSProperties => {
    switch (rank) {
      case 1:
        return { backgroundColor: '#FFD700', fontWeight: 'bold' }; // Oro
      case 2:
        return { backgroundColor: '#C0C0C0', fontWeight: 'bold' }; // Plata
      case 3:
        return { backgroundColor: '#CD7F32', fontWeight: 'bold' }; // Bronce
      default:
        return {}; // Estilo por defecto
    }
  };

  // Función para mostrar la copa para los tres primeros
  const renderTrophy = (rank: number) => {
    if (rank <= 3) {
      return <span role="img" aria-label="trophy">🏆</span>;
    }
    return null;
  };

  const tableHeaderStyle: CSSProperties = {
    backgroundColor: '#25D366',
    color: 'white',
    padding: '10px',
    textAlign: 'left', // No necesita corrección, el tipo ya es correcto
    borderBottom: '2px solid #ddd',
  };

  const tableCellStyle: CSSProperties = {
    padding: '10px',
    textAlign: 'left', // No necesita corrección, el tipo ya es correcto
  };

  return (
    <div style={{ padding: '20px', marginTop: '60px' }}>
      <h2>Leaderboard</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
        <thead>
          <tr style={{ backgroundColor: '#25D366', color: 'white' }}>
            <th style={tableHeaderStyle}>Rank</th>
            <th style={tableHeaderStyle}>Usuario</th>
            <th style={tableHeaderStyle}>Puntuación</th>
          </tr>
        </thead>
        <tbody>
          {leaderboardData.map((entry) => (
            <tr key={entry.rank} style={{ ...getRowStyle(entry.rank), borderBottom: '1px solid #ddd' }}>
              <td style={tableCellStyle}>{renderTrophy(entry.rank)} {entry.rank}</td>
              <td style={tableCellStyle}>
                {entry.imageUrl && <img src={entry.imageUrl} alt={`Avatar de ${entry.username}`} style={{ width: '30px', height: '30px', borderRadius: '50%', marginRight: '5px', verticalAlign: 'middle' }} />}
                {entry.username}
              </td>
              <td style={tableCellStyle}>{entry.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Leaderboard;