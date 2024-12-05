import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";

const BarChart = ({ selectedYear, data }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBar, setSelectedBar] = useState(null);
  const [isFadingOut, setIsFadingOut] = useState(false);

  const handleBarClick = (event) => {
    const points = chartInstance.current.getElementsAtEventForMode(
      event,
      "nearest",
      { intersect: true },
      false
    );

    if (points.length) {
      const index = points[0].index;
      const clickedMonth = data.transactionData[index];
      setSelectedBar(clickedMonth);
      setIsModalOpen(true);
    }
  };

  const handleCloseBar = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setIsFadingOut(false);
    }, 500);
  };

  useEffect(() => {
    const yearData = data && data.transactionData;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    chartInstance.current = new Chart(chartRef.current, {
      type: "bar",
      data: {
        labels: yearData && yearData.map((row) => row.monthWord),
        datasets: [
          {
            label: "Total Transaksi",
            data: yearData && yearData.map((row) => row.count),
            backgroundColor: "#dc3530",
            barPercentage: 0.5,
            categoryPercentage: 0.5,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 5,
        plugins: {
          legend: {
            display: false,
          },
        },
        onClick: handleBarClick,
      },
    });

    return () => {
      chartInstance.current.destroy();
    };
  }, [selectedYear, data]);

  return (
    <>
      <canvas ref={chartRef} />
      {isModalOpen && selectedBar && (
        <div
          className={`modal bg-soft-dark ${
            isFadingOut ? "fade-out" : "fade-in"
          }`}
          style={{ display: isModalOpen ? "block" : "none" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header d-flex justify-content-between">
                <h5 className="modal-title">{selectedBar.monthWord}</h5>
                <h5 className="modal-title">{selectedBar.count} Transaksi</h5>
              </div>
              <div className="modal-body">
                <div>
                  <div className="card mb-3 bg-primary py-0 text-white fw-bold">
                    <div className="card-body d-flex justify-content-between">
                      <div>No Surat Jalan</div>
                      <div>Kuantitas Barang</div>
                    </div>
                  </div>
                  {selectedBar.details.map((v) => (
                    <div key={v.id}>
                      <div className="card mb-3">
                        <div className="card-body d-flex justify-content-between">
                          <div className="fw-medium">
                            {v.deliveryOrderNumber}
                          </div>
                          <div>{v.totalQuantity}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleCloseBar}
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BarChart;
