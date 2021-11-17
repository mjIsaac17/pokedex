import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./card.css";

export const SkeletonCard = () => {
  return (
    <SkeletonTheme baseColor="#B7B7B7" highlightColor="#DADADA">
      <div className="card card--light">
        <p className="card__header__name" style={{ marginBottom: "0.5rem" }}>
          <Skeleton />
        </p>

        <div className="card__body">
          <Skeleton className="skeleton-card__body" />
        </div>
        <div className="skeleton-card__footer">
          <Skeleton height={30} width={50} />
          <Skeleton height={30} width={50} />
        </div>
      </div>
    </SkeletonTheme>
  );
};
