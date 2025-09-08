import styles from "./Sobre.module.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { FaCross, FaHeart, FaPray, FaUsers, FaBook, FaChurch, FaHandsHelping, FaDove } from 'react-icons/fa';
import { HiAcademicCap, HiLightBulb, HiSparkles, HiGift } from 'react-icons/hi';

export default function Sobre() {
  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.hero}>
          <FaCross className={styles.heroIcon} />
          <h1 className={styles.title}>O Sacramento da Crisma</h1>
          <p className={styles.subtitle}>
            Conhecendo mais sobre este importante sacramento de iniciação cristã
          </p>
        </div>

        <div className={styles.content}>
          <section className={styles.introSection}>
            <div className={styles.introCard}>
              <div className={styles.cardHeader}>
                <FaBook className={styles.cardIcon} />
                <h2>O que é a Crisma?</h2>
              </div>
              <div className={styles.cardContent}>
                <p>
                  A Confirmação ou Crisma é um dos sete sacramentos da Igreja Católica e 
                  completa a iniciação cristã junto com o Batismo e a Eucaristia. 
                  É o sacramento no qual recebemos os dons do Espírito Santo para 
                  sermos fortalecidos na fé e nos tornarmos verdadeiros soldados de Cristo.
                </p>
                <p>
                  Durante a celebração, o bispo ou padre autorizado impõe as mãos sobre 
                  os crismandos e os unge com o Santo Crisma, óleo consagrado que simboliza 
                  a presença do Espírito Santo. Este momento marca a passagem para a 
                  maturidade cristã e o compromisso pessoal com a fé.
                </p>
              </div>
            </div>
          </section>

          <section className={styles.giftsSection}>
            <h2 className={styles.sectionTitle}>Os Sete Dons do Espírito Santo</h2>
            <div className={styles.giftsGrid}>
              <div className={styles.giftCard}>
                <HiLightBulb className={styles.giftIcon} />
                <h3>Sabedoria</h3>
                <p>Capacidade de compreender e viver segundo a vontade de Deus</p>
              </div>
              <div className={styles.giftCard}>
                <HiAcademicCap className={styles.giftIcon} />
                <h3>Entendimento</h3>
                <p>Compreensão profunda das verdades da fé e dos mistérios divinos</p>
              </div>
              <div className={styles.giftCard}>
                <FaBook className={styles.giftIcon} />
                <h3>Conselho</h3>
                <p>Capacidade de discernir e orientar a si mesmo e aos outros</p>
              </div>
              <div className={styles.giftCard}>
                <FaHeart className={styles.giftIcon} />
                <h3>Fortaleza</h3>
                <p>Coragem para enfrentar dificuldades e testemunhar a fé</p>
              </div>
              <div className={styles.giftCard}>
                <HiSparkles className={styles.giftIcon} />
                <h3>Ciência</h3>
                <p>Conhecimento das coisas criadas em relação a Deus</p>
              </div>
              <div className={styles.giftCard}>
                <FaPray className={styles.giftIcon} />
                <h3>Piedade</h3>
                <p>Amor filial a Deus e devoção nas práticas religiosas</p>
              </div>
              <div className={styles.giftCard}>
                <FaDove className={styles.giftIcon} />
                <h3>Temor de Deus</h3>
                <p>Respeito reverente a Deus e afastamento do pecado</p>
              </div>
            </div>
          </section>

          <div className={styles.twoColumnSection}>
            <section className={styles.symbolsSection}>
              <div className={styles.card}>
                <div className={styles.cardHeader}>
                  <HiGift className={styles.cardIcon} />
                  <h2>Símbolos da Crisma</h2>
                </div>
                <div className={styles.cardContent}>
                  <div className={styles.symbolItem}>
                    <FaDove className={styles.symbolIcon} />
                    <div>
                      <h4>A Pomba</h4>
                      <p>Representa o Espírito Santo que desce sobre os crismandos</p>
                    </div>
                  </div>
                  <div className={styles.symbolItem}>
                    <div className={styles.oilIcon}>🛢️</div>
                    <div>
                      <h4>O Santo Crisma</h4>
                      <p>Óleo perfumado que simboliza a unção e consagração</p>
                    </div>
                  </div>
                  <div className={styles.symbolItem}>
                    <div className={styles.fireIcon}>🔥</div>
                    <div>
                      <h4>O Fogo</h4>
                      <p>Representa a ação transformadora do Espírito Santo</p>
                    </div>
                  </div>
                  <div className={styles.symbolItem}>
                    <FaHandsHelping className={styles.symbolIcon} />
                    <div>
                      <h4>Imposição das Mãos</h4>
                      <p>Gesto que transmite os dons do Espírito Santo</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className={styles.requirementsSection}>
              <div className={styles.card}>
                <div className={styles.cardHeader}>
                  <FaUsers className={styles.cardIcon} />
                  <h2>Como se Preparar</h2>
                </div>
                <div className={styles.cardContent}>
                  <div className={styles.requirementsList}>
                    <div className={styles.requirement}>
                      <div className={styles.reqNumber}>1</div>
                      <div>
                        <h4>Idade Adequada</h4>
                        <p>Ter entre 14 e 17 anos e estar em "idade da razão"</p>
                      </div>
                    </div>
                    <div className={styles.requirement}>
                      <div className={styles.reqNumber}>2</div>
                      <div>
                        <h4>Ser Batizado</h4>
                        <p>Ter recebido o sacramento do Batismo anteriormente</p>
                      </div>
                    </div>
                    <div className={styles.requirement}>
                      <div className={styles.reqNumber}>3</div>
                      <div>
                        <h4>Participar da Catequese</h4>
                        <p>Frequentar os encontros de preparação regularmente</p>
                      </div>
                    </div>
                    <div className={styles.requirement}>
                      <div className={styles.reqNumber}>4</div>
                      <div>
                        <h4>Escolher um Padrinho</h4>
                        <p>Selecionar alguém que seja referência na fé cristã</p>
                      </div>
                    </div>
                    <div className={styles.requirement}>
                      <div className={styles.reqNumber}>5</div>
                      <div>
                        <h4>Vida Sacramental</h4>
                        <p>Estar em estado de graça e frequentar a Eucaristia</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <section className={styles.effectsSection}>
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <FaChurch className={styles.cardIcon} />
                <h2>Efeitos do Sacramento</h2>
              </div>
              <div className={styles.cardContent}>
                <div className={styles.effectsGrid}>
                  <div className={styles.effectItem}>
                    <FaHeart className={styles.effectIcon} />
                    <h4>Fortalecimento da Fé</h4>
                    <p>Recebemos força espiritual para viver plenamente nossa vocação cristã</p>
                  </div>
                  <div className={styles.effectItem}>
                    <FaUsers className={styles.effectIcon} />
                    <h4>União com a Igreja</h4>
                    <p>Somos mais perfeitamente incorporados à Igreja e sua missão</p>
                  </div>
                  <div className={styles.effectItem}>
                    <FaDove className={styles.effectIcon} />
                    <h4>Dons Especiais</h4>
                    <p>Recebemos uma força especial do Espírito Santo para testemunhar Cristo</p>
                  </div>
                  <div className={styles.effectItem}>
                    <FaHandsHelping className={styles.effectIcon} />
                    <h4>Compromisso Missionário</h4>
                    <p>Somos chamados a ser propagadores da fé por palavra e exemplo</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className={styles.callToAction}>
            <FaHeart className={styles.ctaIcon} />
            <h2>Venha se preparar para receber este Sacramento!</h2>
            <p>
              A Crisma é um momento único e especial na vida de todo cristão. 
              É a oportunidade de fortalecer sua fé e assumir um compromisso mais 
              profundo com Jesus Cristo e sua Igreja.
            </p>
            <a href="/contato" className={styles.ctaButton}>
              Quero me inscrever
            </a>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
}