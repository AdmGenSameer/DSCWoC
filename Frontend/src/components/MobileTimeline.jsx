import '../styles/MobileTimeline.css';

const MobileTimeline = () => {
  const phases = [
    {
      week: 'Week 1',
      title: 'LAUNCH',
      date: 'Day 1-3',
      description: 'Orientation & onboarding',
      color: '#94a3b8',
      planet: '🚀',
    },
    {
      week: 'Week 1',
      title: 'ORBIT PHASE I',
      date: 'Day 4-7',
      description: 'Build foundational skills',
      color: '#fb923c',
      planet: '☀️',
    },
    {
      week: 'Week 2',
      title: 'EARTH STATION',
      date: 'Day 8-10',
      description: 'First major contribution',
      color: '#3b82f6',
      planet: '🌍',
    },
    {
      week: 'Week 2',
      title: 'MARS OUTPOST',
      date: 'Day 11-14',
      description: 'Intermediate features',
      color: '#dc2626',
      planet: '🔴',
    },
    {
      week: 'Week 3',
      title: 'JUPITER JUNCTION',
      date: 'Day 15-17',
      description: 'Tackle complex issues',
      color: '#f59e0b',
      planet: '🟠',
    },
    {
      week: 'Week 3',
      title: 'SATURN SYSTEMS',
      date: 'Day 18-21',
      description: 'Peak contribution phase',
      color: '#eab308',
      planet: '🪐',
    },
    {
      week: 'Week 4',
      title: 'URANUS EXPEDITION',
      date: 'Day 22-24',
      description: 'Final contributions',
      color: '#06b6d4',
      planet: '🔵',
    },
    {
      week: 'Week 4',
      title: 'NEPTUNE REACH',
      date: 'Day 25-26',
      description: 'Submit documentation',
      color: '#2563eb',
      planet: '💙',
    },
    {
      week: 'Week 4',
      title: 'PLUTO POINT',
      date: 'Day 27',
      description: 'Leaderboard freeze',
      color: '#94a3b8',
      planet: '❄️',
    },
    {
      week: 'Week 4',
      title: 'MISSION COMPLETE',
      date: 'Day 28',
      description: 'Closing ceremony',
      color: '#fbbf24',
      planet: '🎆',
    },
  ];

  return (
    <div className="mobile-timeline w-full px-4">
      <div className="mobile-timeline-container">
        {phases.map((phase, index) => (
          <div key={index} className="mobile-timeline-item" style={{ '--delay': `${Math.min(index * 0.05, 0.3)}s` }}>
            <div className="mobile-timeline-marker" style={{ '--color': phase.color }} />
            <div className="mobile-timeline-planet">{phase.planet}</div>
            <div className="mobile-timeline-content">
              <div className="mobile-timeline-week">{phase.week}</div>
              <h3 className="mobile-timeline-title">{phase.title}</h3>
              <div className="mobile-timeline-date">{phase.date}</div>
              <p className="mobile-timeline-desc">{phase.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MobileTimeline;
