const Faq = () => {
  return (
    <div className="h-[400px] text-center">
      <h1>FAQ</h1>
      <br></br>
      <h1>Inspiration</h1>
      <p>
        Introducing the &quot;Web3 Stock Images Protocol&quot; - a revolutionary
        new way for photographers and visual creators to sell their work and
        earn a fair compensation for their efforts.
      </p>
      <p>
        The traditional stock photography industry, represented by centralized
        organizations like Shutterstock, has long been criticized for its unfair
        distribution of profits. These companies leverage their network effect
        to take the lion&apos;s share of the revenue, leaving creators with a
        small percentage of the proceeds. The Web3 Stock Images Protocol aims to
        solve this problem by leveraging the power of decentralized technology
        to create a fair and transparent marketplace for photographers and
        visual creators. By building our protocol on top of Filecoin, we can
        create a decentralized platform for image storage and distribution,
        bypassing the need for centralized organizations.
      </p>
      <h1>What it does</h1>
      <p>
        With our protocol, photographers can sell their images directly to
        customers, without the need for intermediaries. This allows them to earn
        a higher percentage of the proceeds, as well as maintaining control over
        the distribution of their work.
      </p>
      <p>
        Our protocol also uses smart contracts to ensure transparency and
        fairness in the distribution of profits. This allows photographers to
        trust that they will be fairly compensated for their work, without the
        need for centralized organizations to act as intermediaries.
      </p>
      <p>
        In summary, the Web3 Stock Images Protocol is a decentralized
        alternative to centralized stock photography platforms like
        Shutterstock, that aims to empower photographers and visual creators by
        providing them with a fair and transparent marketplace, to sell their
        images and get a fair share of the proceedings.
      </p>
      <p>
        Moreover, our protocol is a building block to create Data DAOs, big
        datasets of images curated and owned by creators.
      </p>
      <h1>How we built it</h1>
      <p>
        The three contracts, developed using solidity, are respectively
        <ul>
          <li>FileStock.sol: storage and purchase of the images,</li>
          <li>
            RightsNFT: mints the ERC1155 token to decrypt the images stored on
            lighthouse
          </li>
          <li>
            CreatorNFT: mints the NFT token, the one which gives the rights to
            receive the proceedings from the image sales.
          </li>
        </ul>
      </p>
      <p>
        All the files are stored in lighthouse, which let us deploy them both
        encrypted and not, in order to protect the original ones and show to the
        user the images with the watermark applied.
      </p>
      <h1>Upload process</h1>
      <p>
        Once the creator uploads the image, a watermark is applied and the
        content is sent to Lighthouse. After he pays the transaction for storing
        the file on the chain, we encrypt the image and we also send it on
        lighthouse, whit the condition that only the owner of the relative
        ERC1155 tokens is able to decrypt it and download it. An NFT is minted
        for the creator, which allows him to receive the revenues from the
        purchases.
      </p>
    </div>
  );
};
export default Faq;
