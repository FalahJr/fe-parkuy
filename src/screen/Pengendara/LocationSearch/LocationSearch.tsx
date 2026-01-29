import React, { useEffect, useReducer, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { locationService } from "../../../services";
import { locationSearchReducer, initialState } from "./LocationSearch.reducer";
import "./LocationSearch.css";
import "leaflet/dist/leaflet.css";

const LocationSearch: React.FC = () => {
  const [state, dispatch] = useReducer(locationSearchReducer, initialState);
  const [mapCenter, setMapCenter] = useState<[number, number]>([
    -7.2575, 112.7521,
  ]); // Default: Surabaya

  useEffect(() => {
    fetchLocations();
  }, []);

  const getStatusText = (status: number): string => {
    return status === 1 ? "Active" : "Inactive";
  };

  const getStatusClass = (status: number): string => {
    return status === 1 ? "active" : "inactive";
  };

  const fetchLocations = async () => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      const response = await locationService.location();
      const locations = response.data;
      dispatch({ type: "SET_LOCATIONS", payload: locations });
    } catch (error: any) {
      dispatch({
        type: "SET_ERROR",
        payload: error.response?.data?.message || "Gagal memuat data lokasi",
      });
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "SET_SEARCH_QUERY", payload: e.target.value });
  };

  const filteredLocations = state.locations.filter(
    (location) =>
      location.locationName
        .toLowerCase()
        .includes(state.searchQuery.toLowerCase()) ||
      location.cityName.toLowerCase().includes(state.searchQuery.toLowerCase()),
  );

  const handleLocationClick = (location: any) => {
    dispatch({ type: "SET_SELECTED_LOCATION", payload: location });
    if (location.coordinate) {
      const [lat, lng] = location.coordinate
        .split(",")
        .map((val: string) => Number(val.trim()));
      if (!isNaN(lat) && !isNaN(lng)) {
        setMapCenter([lat, lng]);
      }
    }
  };

  const closeModal = () => {
    dispatch({ type: "SET_SELECTED_LOCATION", payload: null });
  };

  return (
    <div className="location-search-container">
      <div className="search-header">
        <h1>Cari Lokasi Parkir</h1>
        <p>Temukan area parkir terdekat dengan lokasi Anda</p>
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Cari berdasarkan nama lokasi atau kota..."
          value={state.searchQuery}
          onChange={handleSearchChange}
        />
        <i className="search-icon">🔍</i>
      </div>

      <div className="content-layout">
        <div className="map-section">
          <MapContainer
            center={mapCenter}
            zoom={13}
            scrollWheelZoom={true}
            style={{ height: "100%", width: "100%", borderRadius: "12px" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {filteredLocations.map((location) => {
              if (!location.coordinate) return null;
              const [lat, lng] = location.coordinate
                .split(",")
                .map((val: string) => Number(val.trim()));
              if (isNaN(lat) || isNaN(lng)) return null;

              return (
                <Marker
                  key={location.id_location}
                  position={[lat, lng]}
                  eventHandlers={{
                    click: () => handleLocationClick(location),
                  }}
                >
                  <Popup>
                    <div className="popup-content">
                      <h3>{location.locationName}</h3>
                      <p>{location.cityName}</p>
                      <div className="popup-availability">
                        <span>
                          🚗 {location.availableCars} / {location.car}
                        </span>
                        <span>
                          🏍️ {location.availableMotorCycles} /{" "}
                          {location.motorCycle}
                        </span>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>
        </div>

        <div className="locations-list">
          {state.loading ? (
            <div className="loading">Memuat lokasi...</div>
          ) : state.error ? (
            <div className="error-message">{state.error}</div>
          ) : filteredLocations.length === 0 ? (
            <div className="no-results">Tidak ada lokasi yang ditemukan</div>
          ) : (
            filteredLocations.map((location) => (
              <div
                key={location.id_location}
                className={`location-card ${
                  state.selectedLocation?.id_location === location.id_location
                    ? "selected"
                    : ""
                }`}
                onClick={() => handleLocationClick(location)}
              >
                <div className="location-card-header">
                  <h3>{location.locationName}</h3>
                  <span
                    className={`status-badge ${getStatusClass(location.status)}`}
                  >
                    {getStatusText(location.status)}
                  </span>
                </div>
                <p className="location-city">📍 {location.cityName}</p>
                <div className="availability-info">
                  <div className="availability-item">
                    <span className="vehicle-icon">🚗</span>
                    <span className="availability-text">
                      Mobil: <strong>{location.availableCars}</strong> /{" "}
                      {location.car}
                    </span>
                  </div>
                  <div className="availability-item">
                    <span className="vehicle-icon">🏍️</span>
                    <span className="availability-text">
                      Motor: <strong>{location.availableMotorCycles}</strong> /{" "}
                      {location.motorCycle}
                    </span>
                  </div>
                </div>
                <div className="location-rate">
                  Tarif: <strong>Rp {location.rate.toLocaleString()}</strong>
                  /jam
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {state.selectedLocation && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              ×
            </button>
            <div className="modal-header">
              <h2>{state.selectedLocation.locationName}</h2>
              <span
                className={`status-badge ${getStatusClass(state.selectedLocation.status)}`}
              >
                {getStatusText(state.selectedLocation.status)}
              </span>
            </div>
            <div className="modal-body">
              <div className="detail-row">
                <span className="detail-label">📍 Kota:</span>
                <span className="detail-value">
                  {state.selectedLocation.cityName}
                </span>
              </div>
              <div className="detail-row">
                <span className="detail-label">📮 Alamat:</span>
                <span className="detail-value">
                  {state.selectedLocation.address}
                </span>
              </div>
              <div className="detail-row">
                <span className="detail-label">💰 Tarif:</span>
                <span className="detail-value">
                  Rp {state.selectedLocation.rate.toLocaleString()}/jam
                </span>
              </div>
              <div className="availability-section">
                <h3>Ketersediaan Slot</h3>
                <div className="availability-grid">
                  <div className="availability-box">
                    <div className="vehicle-type">🚗 Mobil</div>
                    <div className="availability-numbers">
                      <span className="available">
                        {state.selectedLocation.availableCars}
                      </span>
                      <span className="separator">/</span>
                      <span className="total">
                        {state.selectedLocation.car}
                      </span>
                    </div>
                    <div className="availability-label">Tersedia</div>
                  </div>
                  <div className="availability-box">
                    <div className="vehicle-type">🏍️ Motor</div>
                    <div className="availability-numbers">
                      <span className="available">
                        {state.selectedLocation.availableMotorCycles}
                      </span>
                      <span className="separator">/</span>
                      <span className="total">
                        {state.selectedLocation.motorCycle}
                      </span>
                    </div>
                    <div className="availability-label">Tersedia</div>
                  </div>
                </div>
              </div>
              <button className="start-parking-btn">Mulai Parkir</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationSearch;
