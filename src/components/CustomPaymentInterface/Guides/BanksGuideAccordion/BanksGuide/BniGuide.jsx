import { Accordion, AccordionItem, AccordionItemHeading, AccordionItemButton, AccordionItemPanel } from "react-accessible-accordion";

const BniGuide = () => {
  return (
    <Accordion>
      <AccordionItem>
        <AccordionItemHeading>
          <AccordionItemButton>ATM BNI</AccordionItemButton>
        </AccordionItemHeading>
        <AccordionItemPanel>
          <ol type="1">
            <li>1. Pilih menu lain pada menu utama.</li>
            <li>2. Pilih transfer.</li>
            <li>3. Pilih ke rekening BNI.</li>
            <li>4. Masukkan nomor rekening pembayaran.</li>
            <li>5. Masukkan jumlah yang akan dibayar, lalu konfirmasi.</li>
            <li>6. Pembayaran berhasil.</li>
          </ol>
        </AccordionItemPanel>
      </AccordionItem>
      <AccordionItem>
        <AccordionItemHeading>
          <AccordionItemButton>Mobile Banking</AccordionItemButton>
        </AccordionItemHeading>
        <AccordionItemPanel>
          <ul>
            <li>1. Pilih transfer.</li>
            <li>2. Pilih virtual account billing.</li>
            <li>3. Pilih rekening debit yang akan digunakan.</li>
            <li>4. Masukkan nomor virtual account, lalu konfirmasi.</li>
            <li>5. Pembayaran berhasil.</li>
          </ul>
        </AccordionItemPanel>
      </AccordionItem>
      <AccordionItem>
        <AccordionItemHeading>
          <AccordionItemButton>Via Bank Lainnya</AccordionItemButton>
        </AccordionItemHeading>
        <AccordionItemPanel>
          <ul>
            <li>1. Pilih bank & cara bayar (ATM/internet/mobile banking) yang Anda inginkan.</li>
            <li>2. Pilih transfer ke bank lain.</li>
            <li>3. Masukkan nomor virtual account BNI.</li>
            <li>4. Masukkan jumlah yang akan dibayar, lalu konfirmasi.</li>
            <li>5. Pembayaran selesai.</li>
          </ul>
        </AccordionItemPanel>
      </AccordionItem>
      <AccordionItem>
        <AccordionItemHeading>
          <AccordionItemButton>Internet Banking</AccordionItemButton>
        </AccordionItemHeading>
        <AccordionItemPanel>
          <ul>
            <li>1. Pilih transaksi, lalu info & administrasi transfer.</li>
            <li>2. Pilih atur rekening tujuan.</li>
            <li>3. Masukkan informasi rekening, lalu konfirmasi.</li>
            <li>4. Pilih transfer, lalu transfer ke rekening BNI.</li>
            <li>5. Masukkan detail pembayaran, lalu konfirmasi.</li>
            <li>6. Pembayaran berhasil.</li>
          </ul>
        </AccordionItemPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default BniGuide;
