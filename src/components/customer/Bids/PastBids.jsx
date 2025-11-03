import React from 'react'
import AuctionCard from '../AuctionCard'

const PastBids = () => {
    return (
        <div>
            <AuctionCard
                title="Vintage Rolex Submariner Watch"
                description="Rare 1960s Rolex Submariner in excellent condition with original box and papers. A true collector's piece."
                currentBid="$12,500"
                timeLeft="2h 34m 18s"
                totalBids="47"
                bidIncrement="$500"
                imageUrl="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop"
                isLive={true}
                isBidInitiated={false}
            />
        </div>
    )
}

export default PastBids