import React from 'react';
import { CardBody, CardContainer, CardItem } from '../evervault-card/evervault-card';

export default function UserOnboard({ setIsImportWalletModalOpen, setIsCreateWalletModalOpen }) {
  return (
    <div className="flex gap-4 flex-wrap items-start">
      <CardContainer className="inter-var w-[100%]">
        <CardBody className="bg-gray-50 relative group/card border-black/[0.1] w-[100%] h-auto rounded-xl p-6 border  ">
          <CardItem translateZ="50" className="text-xl font-bold text-neutral-600">
            💵 Import Wallet
          </CardItem>
          <CardItem translateZ="100" className="w-full mt-4">
            <img
              src="https://images.unsplash.com/photo-1604079628040-94301bb21b91?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              height="1000"
              width="1000"
              className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
              alt="thumbnail"
            />
          </CardItem>
          <div className="flex justify-between items-center mt-5 flex-wrap gap-3">
            <CardItem
              translateZ={20}
              as="button"
              className="px-4 py-3 rounded-xl bg-black text-white text-sm font-semibold cursor-pointer"
              onClick={() => setIsImportWalletModalOpen(true)}
            >
              Import using Private Key
            </CardItem>
            <CardItem
              translateZ={20}
              as="a"
              href="https://twitter.com/mannupaaji"
              target="__blank"
              className="px-4 py-1 rounded-xl text-sm font-semibold text-center text-blue-600"
            >
              Learn More
            </CardItem>
          </div>
        </CardBody>
      </CardContainer>
      <CardContainer className="inter-var w-[100%]">
        <CardBody className="bg-gray-50 relative group/card border-black/[0.1] w-[100%] h-auto rounded-xl p-6 border  ">
          <CardItem translateZ="50" className="text-xl font-bold text-neutral-600">
            🪛 Create Wallet
          </CardItem>
          <CardItem translateZ="100" className="w-full mt-4">
            <img
              src="https://images.unsplash.com/photo-1604076984203-587c92ab2e58?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              height="1000"
              width="1000"
              className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
              alt="thumbnail"
            />
          </CardItem>
          <div className="flex justify-between items-center mt-5 flex-wrap gap-3">
            <CardItem
              translateZ={20}
              as="button"
              onClick={() => setIsCreateWalletModalOpen(true)}
              className="px-4 py-3 rounded-xl bg-black text-white text-sm font-semibold cursor-pointer"
            >
              Generate Wallet
            </CardItem>
            <CardItem
              translateZ={20}
              as="a"
              href="https://twitter.com/mannupaaji"
              target="__blank"
              className="px-4 py-1 rounded-xl text-sm font-semibold text-center text-blue-600"
            >
              Learn More →
            </CardItem>
          </div>
        </CardBody>
      </CardContainer>
    </div>
  );
}
