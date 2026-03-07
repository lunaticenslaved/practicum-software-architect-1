package services

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
	"time"
)

// SensorsService handles communication with the ms-sensors microservice
type SensorsService struct {
	BaseURL    string
	HTTPClient *http.Client
}

// SensorResponse represents a sensor from the ms-sensors service
type SensorResponse struct {
	ID          int       `json:"id"`
	Name        string    `json:"name"`
	Type        string    `json:"type"`
	Location    string    `json:"location"`
	Value       float64   `json:"value"`
	Unit        string    `json:"unit"`
	Status      string    `json:"status"`
	LastUpdated time.Time `json:"lastUpdated"`
	CreatedAt   time.Time `json:"createdAt"`
}

// SensorCreateRequest represents the request to create a sensor
type SensorCreateRequest struct {
	ID       int    `json:"id"`
	Name     string `json:"name"`
	Type     string `json:"type"`
	Location string `json:"location"`
	Unit     string `json:"unit"`
}

// SensorUpdateRequest represents the request to update a sensor
type SensorUpdateRequest struct {
	Name     string  `json:"name,omitempty"`
	Type     string  `json:"type,omitempty"`
	Location string  `json:"location,omitempty"`
	Value    float64 `json:"value,omitempty"`
	Unit     string  `json:"unit,omitempty"`
	Status   string  `json:"status,omitempty"`
}

// SensorValueUpdateRequest represents the request to update sensor value
type SensorValueUpdateRequest struct {
	Value  float64 `json:"value"`
	Status string  `json:"status"`
}

// NewSensorsService creates a new sensors service client
func NewSensorsService(baseURL string) *SensorsService {
	return &SensorsService{
		BaseURL: baseURL,
		HTTPClient: &http.Client{
			Timeout: 10 * time.Second,
		},
	}
}

// ListSensors fetches all sensors from the ms-sensors service
func (s *SensorsService) ListSensors() ([]SensorResponse, error) {
	url := fmt.Sprintf("%s/sensors", s.BaseURL)

	resp, err := s.HTTPClient.Get(url)
	if err != nil {
		return nil, fmt.Errorf("error fetching sensors: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("unexpected status code: %d", resp.StatusCode)
	}

	var sensors []SensorResponse
	if err := json.NewDecoder(resp.Body).Decode(&sensors); err != nil {
		return nil, fmt.Errorf("error decoding sensors response: %w", err)
	}

	return sensors, nil
}

// GetSensorByID fetches a specific sensor by ID from the ms-sensors service
func (s *SensorsService) GetSensorByID(id string) (*SensorResponse, error) {
	url := fmt.Sprintf("%s/sensors/%s", s.BaseURL, id)

	resp, err := s.HTTPClient.Get(url)
	if err != nil {
		return nil, fmt.Errorf("error fetching sensor: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode == http.StatusNotFound {
		return nil, fmt.Errorf("sensor not found")
	}

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("unexpected status code: %d", resp.StatusCode)
	}

	var sensor SensorResponse
	if err := json.NewDecoder(resp.Body).Decode(&sensor); err != nil {
		return nil, fmt.Errorf("error decoding sensor response: %w", err)
	}

	return &sensor, nil
}

// CreateSensor creates a new sensor in the ms-sensors service
func (s *SensorsService) CreateSensor(req SensorCreateRequest) (*SensorResponse, error) {
	url := fmt.Sprintf("%s/sensors", s.BaseURL)

	jsonData, err := json.Marshal(req)
	if err != nil {
		return nil, fmt.Errorf("error marshaling request: %w", err)
	}

	resp, err := s.HTTPClient.Post(url, "application/json", bytes.NewBuffer(jsonData))
	if err != nil {
		return nil, fmt.Errorf("error creating sensor: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK && resp.StatusCode != http.StatusCreated {
		return nil, fmt.Errorf("unexpected status code: %d", resp.StatusCode)
	}

	var sensor SensorResponse
	if err := json.NewDecoder(resp.Body).Decode(&sensor); err != nil {
		return nil, fmt.Errorf("error decoding sensor response: %w", err)
	}

	return &sensor, nil
}

// UpdateSensor updates an existing sensor in the ms-sensors service
func (s *SensorsService) UpdateSensor(id string, req SensorUpdateRequest) (*SensorResponse, error) {
	url := fmt.Sprintf("%s/sensors/%s", s.BaseURL, id)

	jsonData, err := json.Marshal(req)
	if err != nil {
		return nil, fmt.Errorf("error marshaling request: %w", err)
	}

	httpReq, err := http.NewRequest(http.MethodPut, url, bytes.NewBuffer(jsonData))
	if err != nil {
		return nil, fmt.Errorf("error creating request: %w", err)
	}
	httpReq.Header.Set("Content-Type", "application/json")

	resp, err := s.HTTPClient.Do(httpReq)
	if err != nil {
		return nil, fmt.Errorf("error updating sensor: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("unexpected status code: %d", resp.StatusCode)
	}

	var sensor SensorResponse
	if err := json.NewDecoder(resp.Body).Decode(&sensor); err != nil {
		return nil, fmt.Errorf("error decoding sensor response: %w", err)
	}

	return &sensor, nil
}

// UpdateSensorValue updates the value and status of a sensor
func (s *SensorsService) UpdateSensorValue(id string, req SensorValueUpdateRequest) error {
	url := fmt.Sprintf("%s/sensors/%s/value", s.BaseURL, id)

	jsonData, err := json.Marshal(req)
	if err != nil {
		return fmt.Errorf("error marshaling request: %w", err)
	}

	httpReq, err := http.NewRequest(http.MethodPatch, url, bytes.NewBuffer(jsonData))
	if err != nil {
		return fmt.Errorf("error creating request: %w", err)
	}
	httpReq.Header.Set("Content-Type", "application/json")

	resp, err := s.HTTPClient.Do(httpReq)
	if err != nil {
		return fmt.Errorf("error updating sensor value: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return fmt.Errorf("unexpected status code: %d", resp.StatusCode)
	}

	return nil
}

// DeleteSensor deletes a sensor from the ms-sensors service
func (s *SensorsService) DeleteSensor(id string) error {
	url := fmt.Sprintf("%s/sensors/%s", s.BaseURL, id)

	httpReq, err := http.NewRequest(http.MethodDelete, url, nil)
	if err != nil {
		return fmt.Errorf("error creating request: %w", err)
	}

	resp, err := s.HTTPClient.Do(httpReq)
	if err != nil {
		return fmt.Errorf("error deleting sensor: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return fmt.Errorf("unexpected status code: %d", resp.StatusCode)
	}

	return nil
}
