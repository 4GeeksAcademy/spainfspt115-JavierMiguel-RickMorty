import React from "react";

export const Episodes = () => {
    return (
        <div className="container mt-4">
            <h1 className="mb-3">Episodes List</h1>
            <div className="row">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="col-md-6 col-lg-4 mb-3">
                        <div className="card shadow-sm p-3">
                            <h5 className="card-title">Episode {i + 1}</h5>
                            <p className="card-text">Episode Name</p>
                            <p className="card-text text-muted">Issue Date</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}