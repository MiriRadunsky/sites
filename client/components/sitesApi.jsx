import { useState, useEffect } from 'react'
import { sitesAPI } from '../src/services/sitesAPI'

function SitesApiComponent() {
  const [sites, setSites] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSites()
  }, [])

  const fetchSites = async () => {
    try {
      setLoading(true)
      const sitesData = await sitesAPI.getAllSites()
      setSites(sitesData)
    } catch (error) {
      console.error('Error fetching sites:', error)
    } finally {
      setLoading(false)
    }
  }


  const handleDelete = async (id, name) => {
    if (window.confirm(`are you sure you want to delete ${name}?`)) {
      try {
        await sitesAPI.deleteSite(id)
        alert(`${name} deleted successfully!`)
        fetchSites()
      } catch (error) {
        console.error('Error deleting site:', error)
        alert('Error deleting site')
      }
    }
  }

 
  const handleEdit = async (site) => {
    const newName = prompt('New site name:', site.name)
    const newUrl = prompt('New URL:', site.url)
    const newScore = prompt('New score:', site.score)

    if (newName && newUrl && newScore) {
      try {
        const updatedData = {
          name: newName,
          url: newUrl,
          image: site.image,
          score: parseFloat(newScore)
        }
        await sitesAPI.updateSite(site._id, updatedData)
        alert('Site updated successfully!')
        fetchSites()
      } catch (error) {
        console.error('Error updating site:', error)
        alert('Error updating site')
      }
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>pic</th>
            <th>site</th>
            <th>url</th>
            <th>score</th>
            <th>actions</th>
          </tr>
        </thead>
        <tbody>
          {sites.map((site) => (
            <tr key={site._id}>
              <td>
                <img 
                  src={site.image} 
                  alt={site.name}
                  width="50"
                  height="50"
                  style={{ objectFit: 'contain' }}
                />
              </td>
              <td>{site.name}</td>
              <td>
                <a 
                  href={site.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ color: 'blue', textDecoration: 'underline' }}
                >
                  {site.url}
                </a>
              </td>
              <td style={{ textAlign: 'center', fontWeight: 'bold' }}>
                {site.score} 
              </td>
              <td style={{ textAlign: 'center' }}>
                <button 
                  onClick={() => handleEdit(site)}
                  style={{ 
                    margin: '2px', 
                    padding: '5px 10px', 
                    backgroundColor: 'blue',
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '3px',
                    cursor: 'pointer'
                  }}
                >
                 update
                </button>
                <button 
                  onClick={() => handleDelete(site._id, site.name)}
                  style={{ 
                    margin: '2px', 
                    padding: '5px 10px', 
                  backgroundColor: 'red',
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '3px',
                    cursor: 'pointer'
                  }}
                >
                delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default SitesApiComponent