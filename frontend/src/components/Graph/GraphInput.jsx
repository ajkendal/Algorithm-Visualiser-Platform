import React from 'react'
import { Shuffle, Plus, Trash2 } from 'lucide-react'

const GraphInput = ({
  nodes,
  edges,
  startNode,
  endNode,
  onNodesChange,
  onEdgesChange,
  onStartNodeChange,
  onEndNodeChange,
  onRandomize,
}) => {
  const addNode = () => {
    const newNode = {
      id: nodes.length,
      label: String.fromCharCode(65 + nodes.length),
      x: Math.random() * 300 + 150,
      y: Math.random() * 200 + 150,
    }
    onNodesChange([...nodes, newNode])
  }

  const removeNode = (nodeId) => {
    if (nodes.length <= 2) return // Keep minimum 2 nodes

    const newNodes = nodes
      .filter((n) => n.id !== nodeId)
      .map((n, i) => ({
        ...n,
        id: i,
        label: String.fromCharCode(65 + i),
      }))

    const newEdges = edges
      .filter((e) => e.from_node !== nodeId && e.to !== nodeId)
      .map((e) => ({
        ...e,
        from_node: e.from_node > nodeId ? e.from_node - 1 : e.from_node,
        to: e.to > nodeId ? e.to - 1 : e.to,
      }))

    onNodesChange(newNodes)
    onEdgesChange(newEdges)

    // Update start/end nodes if necessary
    if (startNode === nodeId) {
      onStartNodeChange(0)
    } else if (startNode > nodeId) {
      onStartNodeChange(startNode - 1)
    }

    if (endNode === nodeId) {
      onEndNodeChange(newNodes.length - 1)
    } else if (endNode > nodeId) {
      onEndNodeChange(endNode - 1)
    }
  }

  const addEdge = () => {
    if (nodes.length < 2) return

    // Find a valid edge that doesn't already exist
    let from_node = 0
    let to_node = 1

    // Check if edge already exists
    const edgeExists = edges.some(
      (e) =>
        (e.from_node === from_node && e.to === to_node) ||
        (!e.directed && e.from_node === to_node && e.to === from_node)
    )

    if (!edgeExists) {
      const newEdge = {
        from_node,
        to: to_node,
        weight: Math.floor(Math.random() * 9) + 1,
        directed: false,
      }
      onEdgesChange([...edges, newEdge])
    }
  }

  const updateEdge = (index, field, value) => {
    const newEdges = [...edges]
    newEdges[index] = { ...newEdges[index], [field]: value }
    onEdgesChange(newEdges)
  }

  const removeEdge = (index) => {
    const newEdges = edges.filter((_, i) => i !== index)
    onEdgesChange(newEdges)
  }

  return (
    <div className='space-y-6'>
      {/* Node Selection */}
      <div className='grid grid-cols-2 gap-4'>
        <div>
          <label
            className={`block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300`}
          >
            Start Node
          </label>
          <select
            value={startNode}
            onChange={(e) => onStartNodeChange(parseInt(e.target.value))}
            className={`w-full p-2 rounded border bg-white border-gray-300 text-gray-800 dark:bg-gray-800 dark:border-gray-600 dark:text-white`}
          >
            {nodes.map((node) => (
              <option key={node.id} value={node.id}>
                {node.label} (Node {node.id})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            className={`block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300`}
          >
            End Node
          </label>
          <select
            value={endNode}
            onChange={(e) => onEndNodeChange(parseInt(e.target.value))}
            className={`w-full p-2 rounded border bg-white border-gray-300 text-gray-800 dark:bg-gray-800 dark:border-gray-600 dark:text-white`}
          >
            {nodes.map((node) => (
              <option key={node.id} value={node.id}>
                {node.label} (Node {node.id})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Nodes Management */}
      <div>
        <div className='flex justify-between items-center mb-3'>
          <h5 className={`font-medium text-gray-800 dark:text-white`}>
            Nodes ({nodes.length})
          </h5>
          <button
            onClick={addNode}
            className={`px-3 py-1 rounded text-sm flex items-center space-x-1 bg-blue-500 hover:bg-blue-600 text-white dark:bg-blue-600 dark:hover:bg-blue-700 dark:text-white`}
          >
            <Plus className='h-3 w-3' />
            <span>Add Node</span>
          </button>
        </div>

        <div className='space-y-2 max-h-32 overflow-y-auto'>
          {nodes.map((node) => (
            <div
              key={node.id}
              className={`flex items-center justify-between p-2 rounded  bg-gray-200/50  dark:bg-gray-800 mr-1`}
            >
              <span className={`text-sm text-gray-800 dark:text-white`}>
                {node.label} (ID: {node.id})
              </span>
              {nodes.length > 2 && (
                <button
                  onClick={() => removeNode(node.id)}
                  className='text-red-500 hover:text-red-600'
                >
                  <Trash2 className='h-3 w-3' />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Edges Management */}
      <div>
        <div className='flex justify-between items-center mb-3'>
          <h5 className={`font-medium text-gray-800 dark:text-white`}>
            Edges ({edges.length})
          </h5>
          <button
            onClick={addEdge}
            disabled={nodes.length < 2}
            className={`px-3 py-1 rounded text-sm flex items-center space-x-1 disabled:opacity-50 bg-green-500 hover:bg-green-600 text-white dark:bg-green-600 dark:hover:bg-green-700 dark:text-white`}
          >
            <Plus className='h-3 w-3' />
            <span>Add Edge</span>
          </button>
        </div>

        <div className='space-y-2 max-h-40 overflow-y-auto'>
          {edges.map((edge, index) => (
            <div
              key={index}
              className={`p-3 rounded border bg-gray-50 border-gray-200 dark:bg-gray-800 dark:border-gray-600 mr-1`}
            >
              <div className='grid grid-cols-4 gap-2 mb-2'>
                <select
                  value={edge.from_node}
                  onChange={(e) =>
                    updateEdge(index, 'from_node', parseInt(e.target.value))
                  }
                  className={`p-1 rounded text-xs bg-white text-gray-800 dark:bg-gray-600 dark:text-white`}
                >
                  {nodes.map((node) => (
                    <option key={node.id} value={node.id}>
                      {node.label}
                    </option>
                  ))}
                </select>

                <select
                  value={edge.to}
                  onChange={(e) =>
                    updateEdge(index, 'to', parseInt(e.target.value))
                  }
                  className={`p-1 rounded text-xs bg-white text-gray-800 dark:bg-gray-600 dark:text-white`}
                >
                  {nodes.map((node) => (
                    <option key={node.id} value={node.id}>
                      {node.label}
                    </option>
                  ))}
                </select>

                <input
                  type='number'
                  min='1'
                  max='99'
                  value={edge.weight}
                  onChange={(e) =>
                    updateEdge(index, 'weight', parseInt(e.target.value) || 1)
                  }
                  className={`p-1 rounded text-xs bg-white text-gray-800 dark:bg-gray-600 dark:text-white`}
                  placeholder='Weight'
                />

                <button
                  onClick={() => removeEdge(index)}
                  className='text-red-500 hover:text-red-600 text-xs'
                >
                  <Trash2 className='h-3 w-3' />
                </button>
              </div>

              <label className='flex items-center space-x-2'>
                <input
                  type='checkbox'
                  checked={edge.directed}
                  onChange={(e) =>
                    updateEdge(index, 'directed', e.target.checked)
                  }
                  className='text-blue-500'
                />
                <span className={`text-xs text-gray-600 dark:text-gray-300`}>
                  Directed
                </span>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Random Graph Button */}
      <button
        onClick={onRandomize}
        className={`w-full py-2 px-4 rounded font-medium transition-colors flex items-center justify-center space-x-2 bg-purple-500 hover:bg-purple-600 text-white dark:bg-purple-600 dark:hover:bg-purple-700 dark:text-white`}
      >
        <Shuffle className='h-4 w-4' />
        <span>Generate Random Graph</span>
      </button>
    </div>
  )
}

export default GraphInput
