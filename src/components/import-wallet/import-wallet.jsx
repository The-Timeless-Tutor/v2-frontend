import { Fragment, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
// import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { ethers } from 'ethers';
import './styles/style.css';
import CryptoJS from 'crypto-js';

export default function ImportWallet({ open, setOpen, setHasWallet, setWallet }) {
  const [privateKey, setPrivateKey] = useState('');
  const [password, setPassword] = useState('');
  const [isTermsAccepted, setIsTermAccepted] = useState(false);
  const cancelButtonRef = useRef(null);

  // Define a helper function to encrypt the private key
  const encryptPrivateKey = (privateKey, encryptionKey) => {
    const encryptedPrivateKey = CryptoJS.AES.encrypt(privateKey, encryptionKey).toString();
    setHasWallet(true)
    return encryptedPrivateKey;
  };

  const handleImportWalletUsingPrivateKey = () => {
    if (isTermsAccepted && privateKey && password) {
      let wallet = new ethers.Wallet(privateKey);

      if (wallet?.address) {
        const encrypted = encryptPrivateKey(privateKey, password);
        setWallet(wallet)
        window.localStorage.setItem(import.meta.env.VITE_WEB3_WALLET, JSON.stringify(wallet))
        window.localStorage.setItem(import.meta.env.VITE_ENCRYPTED_PRIVATE_KEY_LOCATION, encrypted)
        setPrivateKey("")
        setPassword("")
        setIsTermAccepted(false)
        setOpen(false)
        window.localStorage.setItem(import.meta.env.VITE_IS_WALLET_AUTHENTICATED, true)
      }
    }else{
      console.log("Message: Every field is required!")
    }
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-[1101]"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-400"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-400"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity importWalletModal__container__glassEffect" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title
                        as="h2"
                        className="text-xl mb-4 font-semibold leading-6 text-gray-900"
                      >
                        💵 Import Account
                      </Dialog.Title>

                      <div>
                        <label
                          htmlFor="privateKey"
                          className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white mt-2"
                        >
                          Private Key
                        </label>
                        <input
                          value={privateKey}
                          onChange={(e) => setPrivateKey(e.target.value)}
                          type="password"
                          id="privateKey"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="tv68bkkk985765...095"
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="password"
                          className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white mt-2"
                        >
                          Password
                        </label>
                        <input
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          type="password"
                          id="password"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Password"
                          required
                        />
                      </div>

                      <div className="mt-2 flex items-start gap-3">
                        <input
                          id="default-checkbox"
                          type="checkbox"
                          value={isTermsAccepted}
                          onChange={(e) => {
                            setIsTermAccepted(e.target.checked);
                          }}
                          className="mt-1 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <p className="text-sm text-gray-500">
                          As per our{' '}
                          <a className="border-b-2" href="">
                            User Terms and Conditions
                          </a>
                          , we don't store any sensitive informations of users. Every wallet
                          imported on our platform are safe and non-custodial wallet.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                    onClick={() => handleImportWalletUsingPrivateKey()}
                  >
                    Import
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
