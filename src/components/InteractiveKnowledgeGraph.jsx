import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Search, ZoomIn, ZoomOut, RotateCcw, Plus, Sparkles, Heart, Music, MapPin, User, Calendar, ExternalLink } from 'lucide-react';

export default function InteractiveKnowledgeGraph({ graphData, onSelectNode, onAddNode }) {
  const canvasRef = useRef(null);
  const [nodes, setNodes] = useState([]);
  const [links, setLinks] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [filterCategory, setFilterCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [transform, setTransform] = useState({ x: 0, y: 0, k: 1 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [draggedNode, setDraggedNode] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newNodeForm, setNewNodeForm] = useState({
    label: '',
    type: 'Memory',
    category: 'memory',
    weight: 8.5,
    details: '',
    connectedTo: 'rajan'
  });

  // Initialize node positions in a balanced circular/force layout
  useEffect(() => {
    if (!graphData) return;
    const width = 800;
    const height = 540;
    const centerX = width / 2;
    const centerY = height / 2;

    const initialNodes = graphData.nodes.map((n, idx) => {
      const angle = (idx / graphData.nodes.length) * 2 * Math.PI;
      const radius = n.id === 'rajan' ? 0 : (n.category === 'family' ? 120 : 210) + (idx % 2 === 0 ? 30 : -20);
      return {
        ...n,
        x: centerX + Math.cos(angle) * radius + (Math.random() - 0.5) * 20,
        y: centerY + Math.sin(angle) * radius + (Math.random() - 0.5) * 20,
        vx: 0,
        vy: 0
      };
    });

    setNodes(initialNodes);
    setLinks([...graphData.links]);
    if (initialNodes.length > 0) {
      setSelectedNode(initialNodes[0]);
    }
  }, [graphData]);

  // Physics animation loop for smooth spring relaxation
  useEffect(() => {
    let animId;
    const simulate = () => {
      setNodes(prevNodes => {
        if (!prevNodes || prevNodes.length === 0) return prevNodes;
        const width = 800;
        const height = 540;
        const cx = width / 2;
        const cy = height / 2;

        const updated = prevNodes.map(n => ({ ...n }));

        // Center attraction & repulsion
        for (let i = 0; i < updated.length; i++) {
          const n1 = updated[i];
          if (draggedNode && draggedNode.id === n1.id) continue;

          // Gentle pull to center
          n1.vx += (cx - n1.x) * 0.001;
          n1.vy += (cy - n1.y) * 0.001;

          // Repulsion from other nodes
          for (let j = i + 1; j < updated.length; j++) {
            const n2 = updated[j];
            const dx = n2.x - n1.x;
            const dy = n2.y - n1.y;
            const dist = Math.sqrt(dx * dx + dy * dy) || 1;
            const minDist = (n1.radius || 20) + (n2.radius || 20) + 40;
            if (dist < minDist) {
              const force = (minDist - dist) / dist * 0.08;
              n1.vx -= dx * force;
              n1.vy -= dy * force;
              n2.vx += dx * force;
              n2.vy += dy * force;
            }
          }
        }

        // Spring force along links
        links.forEach(l => {
          const sourceNode = updated.find(n => n.id === (l.source.id || l.source));
          const targetNode = updated.find(n => n.id === (l.target.id || l.target));
          if (sourceNode && targetNode) {
            const dx = targetNode.x - sourceNode.x;
            const dy = targetNode.y - sourceNode.y;
            const dist = Math.sqrt(dx * dx + dy * dy) || 1;
            const targetDist = 130;
            const force = (dist - targetDist) * 0.015;

            if (!draggedNode || draggedNode.id !== sourceNode.id) {
              sourceNode.vx += (dx / dist) * force;
              sourceNode.vy += (dy / dist) * force;
            }
            if (!draggedNode || draggedNode.id !== targetNode.id) {
              targetNode.vx -= (dx / dist) * force;
              targetNode.vy -= (dy / dist) * force;
            }
          }
        });

        // Apply velocity with damping
        updated.forEach(n => {
          if (!draggedNode || draggedNode.id !== n.id) {
            n.x += n.vx;
            n.y += n.vy;
            n.vx *= 0.85;
            n.vy *= 0.85;
          }
        });

        return updated;
      });

      animId = requestAnimationFrame(simulate);
    };

    animId = requestAnimationFrame(simulate);
    return () => cancelAnimationFrame(animId);
  }, [links, draggedNode]);

  // Render to canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    ctx.save();
    ctx.translate(transform.x, transform.y);
    ctx.scale(transform.k, transform.k);

    // Draw grid background
    ctx.strokeStyle = '#E3DFD7';
    ctx.lineWidth = 0.5;
    const gridSize = 40;
    for (let x = -width; x < width * 2; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, -height);
      ctx.lineTo(x, height * 2);
      ctx.stroke();
    }
    for (let y = -height; y < height * 2; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(-width, y);
      ctx.lineTo(width * 2, y);
      ctx.stroke();
    }

    // Draw Links
    links.forEach(l => {
      const s = nodes.find(n => n.id === (l.source.id || l.source));
      const t = nodes.find(n => n.id === (l.target.id || l.target));
      if (!s || !t) return;

      const isConnectedToSelected = selectedNode && (s.id === selectedNode.id || t.id === selectedNode.id);
      ctx.beginPath();
      ctx.moveTo(s.x, s.y);
      ctx.lineTo(t.x, t.y);
      ctx.strokeStyle = isConnectedToSelected ? '#0F6E56' : '#C5BFB3';
      ctx.lineWidth = isConnectedToSelected ? 2.5 : 1.2;
      ctx.stroke();

      // Draw relationship label midpoint
      const midX = (s.x + t.x) / 2;
      const midY = (s.y + t.y) / 2;
      if (transform.k > 0.85 || isConnectedToSelected) {
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(midX - 35, midY - 8, 70, 16);
        ctx.strokeStyle = '#D5D0C6';
        ctx.lineWidth = 0.5;
        ctx.strokeRect(midX - 35, midY - 8, 70, 16);

        ctx.font = '9px "JetBrains Mono", monospace';
        ctx.fillStyle = isConnectedToSelected ? '#0F6E56' : '#6B6B6B';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(l.label.length > 14 ? l.label.substring(0, 12) + '..' : l.label, midX, midY);
      }
    });

    // Draw Nodes
    nodes.forEach(n => {
      // Check category filter
      const matchesCategory = filterCategory === 'all' || 
        (filterCategory === 'family' && (n.category === 'family' || n.category === 'self')) ||
        (filterCategory === 'memory' && (n.category === 'memory' || n.type === 'Event')) ||
        (filterCategory === 'sensory' && (n.category === 'music' || n.category === 'sensory' || n.category === 'routine')) ||
        (filterCategory === 'location' && n.type === 'Location');

      const matchesSearch = !searchQuery || n.label.toLowerCase().includes(searchQuery.toLowerCase()) || (n.details && n.details.toLowerCase().includes(searchQuery.toLowerCase()));
      const isVisible = matchesCategory && matchesSearch;

      ctx.save();
      ctx.globalAlpha = isVisible ? 1.0 : 0.2;

      const isSelected = selectedNode && selectedNode.id === n.id;
      const isHovered = hoveredNode && hoveredNode.id === n.id;
      const radius = (n.radius || 20) * (isSelected ? 1.15 : 1);

      // Pulse ring for high emotional weight nodes
      if (n.weight >= 9.5) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, radius + 8, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(29, 158, 117, 0.35)';
        ctx.lineWidth = 2;
        ctx.setLineDash([4, 4]);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // Outer glow if selected
      if (isSelected || isHovered) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, radius + 5, 0, Math.PI * 2);
        ctx.strokeStyle = isSelected ? '#1D9E75' : '#85B7EB';
        ctx.lineWidth = 3;
        ctx.stroke();
      }

      // Node Circle
      ctx.beginPath();
      ctx.arc(n.x, n.y, radius, 0, Math.PI * 2);
      ctx.fillStyle = n.color || '#0F6E56';
      ctx.fill();
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Node Label
      ctx.font = `${isSelected ? 'bold 12px' : '500 11px'} Inter, sans-serif`;
      ctx.fillStyle = '#0F0F0F';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      ctx.fillText(n.label, n.x, n.y + radius + 5);

      // Emotional weight badge inside node
      ctx.font = '10px "JetBrains Mono", monospace';
      ctx.fillStyle = '#FFFFFF';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(n.weight.toFixed(1), n.x, n.y);

      ctx.restore();
    });

    ctx.restore();
  }, [nodes, links, transform, selectedNode, hoveredNode, filterCategory, searchQuery]);

  // Mouse interaction: Pan, Zoom, Drag Node, Click
  const handleMouseDown = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;

    // Convert client coords to graph space
    const graphX = (clientX - transform.x) / transform.k;
    const graphY = (clientY - transform.y) / transform.k;

    // Check if clicked a node
    const clicked = nodes.find(n => {
      const dx = n.x - graphX;
      const dy = n.y - graphY;
      return Math.sqrt(dx * dx + dy * dy) <= (n.radius || 20);
    });

    if (clicked) {
      setDraggedNode(clicked);
      setSelectedNode(clicked);
      if (onSelectNode) onSelectNode(clicked);
    } else {
      setIsDragging(true);
      setDragStart({ x: clientX - transform.x, y: clientY - transform.y });
    }
  };

  const handleMouseMove = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;

    if (draggedNode) {
      const graphX = (clientX - transform.x) / transform.k;
      const graphY = (clientY - transform.y) / transform.k;
      setNodes(prev => prev.map(n => n.id === draggedNode.id ? { ...n, x: graphX, y: graphY, vx: 0, vy: 0 } : n));
    } else if (isDragging) {
      setTransform(prev => ({
        ...prev,
        x: clientX - dragStart.x,
        y: clientY - dragStart.y
      }));
    } else {
      // Hover detection
      const graphX = (clientX - transform.x) / transform.k;
      const graphY = (clientY - transform.y) / transform.k;
      const hovered = nodes.find(n => {
        const dx = n.x - graphX;
        const dy = n.y - graphY;
        return Math.sqrt(dx * dx + dy * dy) <= (n.radius || 20);
      });
      setHoveredNode(hovered || null);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setDraggedNode(null);
  };

  const handleWheel = (e) => {
    e.preventDefault();
    const zoomFactor = e.deltaY < 0 ? 1.1 : 0.9;
    setTransform(prev => ({
      ...prev,
      k: Math.max(0.4, Math.min(2.5, prev.k * zoomFactor))
    }));
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newNodeForm.label.trim()) return;

    const newId = `custom_${Date.now()}`;
    const colors = {
      Person: '#185FA5',
      Memory: '#8E44AD',
      Event: '#854F0B',
      Location: '#16A085',
      SensoryAnchor: '#E67E22'
    };

    const newNode = {
      id: newId,
      label: newNodeForm.label,
      type: newNodeForm.type,
      category: newNodeForm.category,
      weight: parseFloat(newNodeForm.weight),
      details: newNodeForm.details,
      color: colors[newNodeForm.type] || '#0F6E56',
      radius: 22,
      x: 400 + (Math.random() - 0.5) * 80,
      y: 270 + (Math.random() - 0.5) * 80,
      vx: 0,
      vy: 0
    };

    const newLink = {
      source: newNodeForm.connectedTo,
      target: newId,
      label: 'CONNECTED_TO',
      weight: 0.9
    };

    setNodes(prev => [...prev, newNode]);
    setLinks(prev => [...prev, newLink]);
    setSelectedNode(newNode);
    setShowAddModal(false);
    setNewNodeForm({
      label: '',
      type: 'Memory',
      category: 'memory',
      weight: 8.5,
      details: '',
      connectedTo: 'rajan'
    });

    if (onAddNode) onAddNode(newNode, newLink);
  };

  return (
    <div className="reminisce-graph-container" style={{ position: 'relative', background: '#FFFFFF', borderRadius: 16, border: '1px solid #D5D0C6', overflow: 'hidden' }}>
      {/* Top Toolbar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 20px', borderBottom: '1px solid #EDEAE3', background: '#F7F5F0', flexWrap: 'wrap', gap: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontFamily: 'DM Serif Display, serif', fontSize: 18, color: '#0F0F0F' }}>Personal Knowledge Graph</span>
          <span style={{ fontSize: 11, background: '#E1F5EE', color: '#0F6E56', padding: '2px 8px', borderRadius: 12, fontWeight: 600 }}>Neo4j Embedded · {nodes.length} Nodes</span>
        </div>

        {/* Filter Pills */}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {[
            { id: 'all', label: 'All Entities' },
            { id: 'family', label: 'People' },
            { id: 'memory', label: 'Memories & Events' },
            { id: 'sensory', label: 'Music & Anchors' },
            { id: 'location', label: 'Places' }
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setFilterCategory(f.id)}
              style={{
                fontSize: 11,
                padding: '4px 10px',
                borderRadius: 14,
                border: filterCategory === f.id ? '1px solid #0F6E56' : '1px solid #D5D0C6',
                background: filterCategory === f.id ? '#0F6E56' : '#FFFFFF',
                color: filterCategory === f.id ? '#FFFFFF' : '#3A3A3A',
                cursor: 'pointer',
                fontWeight: 500,
                transition: 'all 0.15s'
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Search & Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ position: 'relative' }}>
            <Search size={14} style={{ position: 'absolute', left: 8, top: 8, color: '#9B9B9B' }} />
            <input
              type="text"
              placeholder="Search graph..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                fontSize: 12,
                padding: '6px 10px 6px 28px',
                borderRadius: 8,
                border: '1px solid #D5D0C6',
                width: 140,
                outline: 'none',
                background: '#FFFFFF'
              }}
            />
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              fontSize: 11,
              padding: '6px 12px',
              borderRadius: 8,
              background: '#0F6E56',
              color: '#FFFFFF',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 500
            }}
          >
            <Plus size={13} /> Add Node
          </button>
        </div>
      </div>

      {/* Main Graph Canvas Area */}
      <div style={{ position: 'relative', height: 480, overflow: 'hidden' }}>
        <canvas
          ref={canvasRef}
          width={800}
          height={480}
          style={{ width: '100%', height: '100%', display: 'block', cursor: isDragging ? 'grabbing' : (hoveredNode ? 'pointer' : 'grab') }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onWheel={handleWheel}
        />

        {/* Canvas Controls Float */}
        <div style={{ position: 'absolute', left: 16, bottom: 16, display: 'flex', flexDirection: 'column', gap: 6, background: 'rgba(255,255,255,0.95)', padding: 6, borderRadius: 8, border: '1px solid #D5D0C6', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <button
            title="Zoom In"
            onClick={() => setTransform(t => ({ ...t, k: Math.min(2.5, t.k * 1.2) }))}
            style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 4, color: '#3A3A3A' }}
          >
            <ZoomIn size={16} />
          </button>
          <button
            title="Zoom Out"
            onClick={() => setTransform(t => ({ ...t, k: Math.max(0.4, t.k * 0.8) }))}
            style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 4, color: '#3A3A3A' }}
          >
            <ZoomOut size={16} />
          </button>
          <button
            title="Reset View"
            onClick={() => setTransform({ x: 0, y: 0, k: 1 })}
            style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 4, color: '#3A3A3A' }}
          >
            <RotateCcw size={16} />
          </button>
        </div>

        {/* Legend Overlay */}
        <div style={{ position: 'absolute', right: 16, bottom: 16, background: 'rgba(255,255,255,0.92)', padding: '8px 12px', borderRadius: 8, border: '1px solid #EDEAE3', fontSize: 11, display: 'flex', gap: 12, alignItems: 'center' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#0F6E56' }}></span> Self
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#C0392B' }}></span> Family
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#E67E22' }}></span> Sensory/Music
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#534AB7' }}></span> Location/Place
          </span>
        </div>
      </div>

      {/* Selected Node Inspector Drawer */}
      {selectedNode && (
        <div style={{ borderTop: '1px solid #EDEAE3', padding: '18px 24px', background: '#FAFAFA', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
          <div style={{ flex: 1, minWidth: 260 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <span style={{ width: 12, height: 12, borderRadius: '50%', background: selectedNode.color || '#0F6E56' }}></span>
              <span style={{ fontSize: 16, fontWeight: 600, color: '#0F0F0F' }}>{selectedNode.label}</span>
              <span style={{ fontSize: 10, textTransform: 'uppercase', background: '#EDEAE3', padding: '2px 6px', borderRadius: 4, fontFamily: 'JetBrains Mono', color: '#6B6B6B' }}>{selectedNode.type}</span>
              <span style={{ fontSize: 11, background: '#FAEEDA', color: '#854F0B', padding: '2px 8px', borderRadius: 12, fontWeight: 600 }}>Weight: {selectedNode.weight} / 10</span>
            </div>
            <p style={{ fontSize: 13, color: '#3A3A3A', lineHeight: 1.5 }}>{selectedNode.details}</p>
          </div>

          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <div style={{ fontSize: 11, color: '#6B6B6B', textAlign: 'right' }}>
              <div>Connected to <strong>{links.filter(l => (l.source.id || l.source) === selectedNode.id || (l.target.id || l.target) === selectedNode.id).length}</strong> relationships</div>
              <div style={{ color: '#0F6E56', marginTop: 2 }}>High Resilience Memory Pathway</div>
            </div>
          </div>
        </div>
      )}

      {/* Add Node Modal */}
      {showAddModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#FFFFFF', borderRadius: 16, width: 440, padding: 28, boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
            <h3 style={{ margin: '0 0 16px', fontSize: 18, color: '#0F0F0F', fontFamily: 'DM Serif Display, serif' }}>Add New Memory Node</h3>
            <form onSubmit={handleAddSubmit}>
              <div style={{ marginBottom: 12 }}>
                <label style={{ display: 'block', fontSize: 11, textTransform: 'uppercase', fontWeight: 600, color: '#6B6B6B', marginBottom: 4 }}>Memory / Entity Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Grandfather's Pocket Watch"
                  value={newNodeForm.label}
                  onChange={e => setNewNodeForm({ ...newNodeForm, label: e.target.value })}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid #D5D0C6', fontSize: 13, boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 11, textTransform: 'uppercase', fontWeight: 600, color: '#6B6B6B', marginBottom: 4 }}>Type</label>
                  <select
                    value={newNodeForm.type}
                    onChange={e => setNewNodeForm({ ...newNodeForm, type: e.target.value })}
                    style={{ width: '100%', padding: '8px 10px', borderRadius: 8, border: '1px solid #D5D0C6', fontSize: 13 }}
                  >
                    <option value="Memory">Memory Story</option>
                    <option value="Person">Person</option>
                    <option value="Event">Milestone Event</option>
                    <option value="Location">Location</option>
                    <option value="SensoryAnchor">Sensory / Music</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 11, textTransform: 'uppercase', fontWeight: 600, color: '#6B6B6B', marginBottom: 4 }}>Emotional Weight ({newNodeForm.weight})</label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    step="0.1"
                    value={newNodeForm.weight}
                    onChange={e => setNewNodeForm({ ...newNodeForm, weight: e.target.value })}
                    style={{ width: '100%', marginTop: 8 }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: 12 }}>
                <label style={{ display: 'block', fontSize: 11, textTransform: 'uppercase', fontWeight: 600, color: '#6B6B6B', marginBottom: 4 }}>Connect To Anchor</label>
                <select
                  value={newNodeForm.connectedTo}
                  onChange={e => setNewNodeForm({ ...newNodeForm, connectedTo: e.target.value })}
                  style={{ width: '100%', padding: '8px 10px', borderRadius: 8, border: '1px solid #D5D0C6', fontSize: 13 }}
                >
                  {nodes.map(n => (
                    <option key={n.id} value={n.id}>{n.label} ({n.type})</option>
                  ))}
                </select>
              </div>

              <div style={{ marginBottom: 20 }}>
                <label style={{ display: 'block', fontSize: 11, textTransform: 'uppercase', fontWeight: 600, color: '#6B6B6B', marginBottom: 4 }}>Emotional Context / Narrative</label>
                <textarea
                  rows={3}
                  placeholder="Describe why this memory matters, the emotions felt, sensory details..."
                  value={newNodeForm.details}
                  onChange={e => setNewNodeForm({ ...newNodeForm, details: e.target.value })}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid #D5D0C6', fontSize: 13, boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  style={{ padding: '8px 16px', borderRadius: 8, border: '1px solid #D5D0C6', background: '#FFFFFF', cursor: 'pointer', fontSize: 13 }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ padding: '8px 18px', borderRadius: 8, border: 'none', background: '#0F6E56', color: '#FFFFFF', fontWeight: 600, cursor: 'pointer', fontSize: 13 }}
                >
                  Insert Node into Graph
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
