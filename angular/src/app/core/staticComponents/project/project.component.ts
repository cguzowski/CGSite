import { Component } from '@angular/core';
import {
  ProjectSlide,
  ProjectCardSliderComponent,
} from './project-card-slider/project-card-slider.component';

interface ProjectWalkthrough {
  id: string;
  title: string;
  summary: string;
  slides: readonly ProjectSlide[];
}

@Component({
  selector: 'app-project',
  imports: [ProjectCardSliderComponent],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css',
})
export class ProjectComponent {
  readonly personalWebsiteInfrastructureSlides: readonly ProjectSlide[] = [
    {
      title: 'The portfolio host',
      url: 'https://www.raspberrypi.com/',
      description: 'A Raspberry Pi connected alongside home networking equipment.',
      image: '/assets/images/CGSitePhotos/0raspby.jpg',
      imageAlt: 'Black Raspberry Pi enclosure connected beside home networking equipment',
      color: '#28343d',
    },
    {
      title: 'Remote access',
      url: 'https://connect.raspberrypi.com/',
      description: 'The Raspberry Pi Connect sign-in screen used to reach the device.',
      image: '/assets/images/CGSitePhotos/1RPiConnect.png',
      imageAlt: 'Raspberry Pi Connect sign-in screen',
      color: '#c92f53',
    },
    {
      title: 'Domain registration',
      url: 'https://www.namecheap.com/',
      description: 'The portfolio domain listed as active in the registrar dashboard.',
      image: '/assets/images/CGSitePhotos/2NameCheap.png',
      imageAlt: 'Namecheap domain list showing the portfolio domain as active',
      color: '#e85d19',
    },
    {
      title: 'Domain management',
      url: 'https://www.cloudflare.com/',
      description: 'The portfolio domain shown as active in the Cloudflare dashboard.',
      image: '/assets/images/CGSitePhotos/3Cloudflare.png',
      imageAlt: 'Cloudflare domain overview showing the portfolio domain as active',
      color: '#d95f13',
    },
    {
      title: 'The live website',
      url: 'https://cguzowski.com/',
      description: 'A mobile view of the portfolio About section.',
      image: '/assets/images/CGSitePhotos/4LiveWebsite.png',
      imageAlt: 'Mobile portfolio About section with portrait, animated words, and steaming cup illustration',
      color: '#24372f',
    },
  ];

  readonly atlasCapitalIntelligenceSlides: readonly ProjectSlide[] = [
    {
      title: 'Portfolio workbench',
      description: 'A dashboard brings the selected portfolio, its headline metrics, and allocation view together.',
      image: '/assets/images/ACIPics/0dashbaordOverview.jpg',
      imageAlt: 'Atlas Capital Intelligence dashboard showing a selected portfolio, summary metrics, and allocation chart',
      color: '#153b35',
    },
    {
      title: 'Saved portfolios',
      description: 'The global selector exposes the portfolios available from the application database.',
      image: '/assets/images/ACIPics/1dbPortfolios.png',
      imageAlt: 'Atlas portfolio selector expanded to show several saved database portfolios',
      color: '#18385a',
    },
    {
      title: 'Portfolio overview',
      description: 'The overview summarizes value, risk profile, positions, daily change, and last update.',
      image: '/assets/images/ACIPics/2portfolioOverview.jpg',
      imageAlt: 'Portfolio overview panel with value, risk, position count, daily profit and loss, and update time',
      color: '#24364f',
    },
    {
      title: 'Allocation breakdown',
      description: 'Visitors can inspect concentration by asset, sector, class, geography, or currency.',
      image: '/assets/images/ACIPics/3allocationBreakdown.jpg',
      imageAlt: 'Asset allocation breakdown with category controls, donut chart, holdings, percentages, and values',
      color: '#285648',
    },
    {
      title: 'Manual portfolio builder',
      description: 'A structured workflow supports manual holdings entry and CSV, JSON, or XML upload.',
      image: '/assets/images/ACIPics/4CreatePortfolioManually.png',
      imageAlt: 'Manual portfolio builder with upload, portfolio details, row controls, and submit action',
      color: '#176b5a',
    },
    {
      title: 'Portfolio generator',
      description: 'A separate generator UI prepares editable holdings from sector and strategy filters.',
      image: '/assets/images/ACIPics/5CreatePortfolioGenerate.jpg',
      imageAlt: 'Portfolio generator with sector filters, asset count, portfolio value, and strategy controls',
      color: '#25695b',
    },
    {
      title: 'Scenario simulator',
      description: 'The simulation UI compares portfolio values and allocations before and after a selected stress scenario.',
      image: '/assets/images/ACIPics/6Simulator.jpg',
      imageAlt: 'Scenario simulator comparing two portfolios before and after a COVID liquidity shock',
      color: '#27445c',
    },
    {
      title: 'Plain-language assistant UI',
      description: 'Planned integration: the designed chat view can explain portfolio questions in beginner-friendly language.',
      image: '/assets/images/ACIPics/aiChat1Like5.jpg',
      imageAlt: 'Atlas assistant interface showing a beginner-friendly response to an oil price question',
      color: '#23624f',
    },
    {
      title: 'Expert assistant UI',
      description: 'Planned integration: the alternate response mode presents the same question with investment terminology.',
      image: '/assets/images/ACIPics/8aiChat2LikeExpert.jpg',
      imageAlt: 'Atlas assistant interface showing an expert-style response to an oil price question',
      color: '#245747',
    },
  ];

  readonly paymentCopilotSlides: readonly ProjectSlide[] = [
    {
      title: 'Payment Incident Work Queue',
      description: 'A centralized workspace for managing and tracking payment incidents.',
      image: '/assets/images/PayCoPilotPic/copilot0WorkQue.jpg',
      imageAlt: 'Payment Incident Ai Copilot dashboard showing a selected portfolio, summary metrics, and allocation chart',
      color: '#3e92ff',
    },
    {
      title: 'Investigation Initiation',
      description: 'Start point for operator to begin investigating a payment incident with AI assistance.',
      image: '/assets/images/PayCoPilotPic/copilot1StartInvestigation.jpg',
      imageAlt: 'Payment Incident Ai Copilot starting investigation',
      color: '#671aff',
    },
    {
      title: 'Workplace Overview',
      description: 'Investigation workspace for gathering error evidence, analyzing data, and reviewing AI-generated insights.',
      image: '/assets/images/PayCoPilotPic/copilot2InvestigationWorkplace.jpg',
      imageAlt: 'Payment Incident Ai Copilot investigation workplace',
      color: '#3bc3fe',
    },
    {
      title: 'Service Error Evidence',
      description: 'Documentation of errors encountered during the payment incident investigation.',
      image: '/assets/images/PayCoPilotPic/copilot3ServiceErrorEvidence.jpg',
      imageAlt: 'Payment Incident Ai Copilot service error evidence',
      color: '#2b4489',
    },
    {
      title: 'RAG Runbook Match',
      description: 'Matching of the payment incident with relevant runbooks.',
      image: '/assets/images/PayCoPilotPic/copilot4RAGRunBookMatch.jpg',
      imageAlt: 'Payment Incident Ai Copilot RAG runbook match',
      color: '#5f97f9',
    },
    {
      title: 'RAG Policy Match',
      description: 'Matching of the payment incident with relevant policies.',
      image: '/assets/images/PayCoPilotPic/copilot5RAGPolicyMatch.jpg',
      imageAlt: 'Payment Incident Ai Copilot RAG policy match',
      color: '#1900ff',
    },
    {
      title: 'Generated Report',
      description: 'AI-generated report summarizing the payment incident investigation.',
      image: '/assets/images/PayCoPilotPic/copilot6GenReport1.jpg',
      imageAlt: 'Payment Incident Ai Copilot generated report',
      color: '#4899b0',
    },
    {
      title: 'Generated Report Continued',
      description: 'Continuation of the AI-generated report summary',
      image: '/assets/images/PayCoPilotPic/copilot7GenReport1Continued.jpg',
      imageAlt: 'Payment Incident Ai Copilot generated report continued',
      color: '#226e94',
    },
    {
      title: 'Human-in-the-loop Decision',
      description: 'Decision-making process involving human oversight in the payment incident investigation.',
      image: '/assets/images/PayCoPilotPic/copilot8HITLDecision.jpg',
      imageAlt: 'Payment Incident Ai Copilot Human-in-the-loop decision',
      color: '#6988bb',
    },
    {
      title: 'Audit Timeline',
      description: 'Timeline of the audit process from new Incident detected. through investigation, report generation, and final decision.',
      image: '/assets/images/PayCoPilotPic/copilot9AuditTimeline1.jpg',
      imageAlt: 'Payment Incident Ai Copilot audit timeline',
      color: '#478fe0',
    },
    {
      title: 'Audit Timeline Continued',
      description: 'Continuation of the audit timeline.',
      image: '/assets/images/PayCoPilotPic/copilot9AuditTimeline2Continued.jpg',
      imageAlt: 'Payment Incident Ai Copilot audit timeline continued',
      color: '#5c97b3',
    },
    {
      title: '4 Command Terminals for Two Separate Systems',
      description: 'Four command terminals utilized for managing and monitoring two distinct systems.',
      image: '/assets/images/PayCoPilotPic/CmdTermainls4TwoSeperateSystems.png',
      imageAlt: 'Command terminals for two separate systems',
      color: '#c0c0c0',
    },
    {
      title: 'Synthetic Tenant System',
      description: 'A separate system providing synthetic tenant data by generating incidents that will be detected by the main system, used for testing and validation.',
      image: '/assets/images/PayCoPilotPic/GenSys0.jpg',
      imageAlt: 'Synthetic Tenant System',
      color: '#de4646',
    },
    {
      title: 'Generated Input for Synthetic Tenant System',
      description: 'Input data generated for the separate synthetic tenant system.',
      image: '/assets/images/PayCoPilotPic/GenSys1GeneratedInput.jpg',
      imageAlt: 'Generated input for the separate synthetic tenant system',
      color: '#a72d2d',
    },
    {
      title: 'Answer Key Output for Synthetic Tenant System',
      description: 'Output data representing the answer key for the separate synthetic tenant system.',
      image: '/assets/images/PayCoPilotPic/GenSys3AnswerKeyOutputTest.jpg',
      imageAlt: 'Answer key output for the separate synthetic tenant system',
      color: '#a97336',
    },
    {
      title: 'Database PSQL During Demo',
      description: 'Snapshot of the PostgreSQL database during the demonstration.',
      image: '/assets/images/PayCoPilotPic/DatabasePSQLDuringDemo.jpg',
      imageAlt: 'Database PSQL during demo',
      color: '#9139b4',
    },
    {
      title: 'Ai Specs',
      description: 'The specific AI models utilized in the Payment Incident AI Copilot for various tasks and functionalities.',
      image: '/assets/images/PayCoPilotPic/AiArchitecture.jpg',
      imageAlt: 'AI architecture ',
      color: '#62a65f',
    },
    {
      title: 'Runbook and Policy PDF Documents',
      description: 'Documentation for the runbook and policy documents.',
      image: '/assets/images/PayCoPilotPic/RunBookAndPolicyPDFs.jpg',
      imageAlt: 'Runbook and policy PDF documents',
      color: '#7de183',
    },
    {
      title: 'Json Object of Ingested Chunk and Vector',
      description: 'Representation of the JSON object containing the ingested chunk and vector data.',
      image: '/assets/images/PayCoPilotPic/JsonObjectOfIngestedChunkAndVector.jpg',
      imageAlt: 'Json object of ingested chunk and vector',
      color: '#2f5c28',
    },
  ];

  readonly projectWalkthroughs: readonly ProjectWalkthrough[] = [
    {
      id: 'self-hosted-website',
      title: 'Self-hosted personal website',
      summary: 'The infrastructure path from a Raspberry Pi host through domain management to this live portfolio.',
      slides: this.personalWebsiteInfrastructureSlides,
    },
    {
      id: 'payment-incident-ai-copilot',
      title: 'Payment Incident AI Copilot',
      summary: 'An incident-investigation workflow spanning evidence gathering, retrieval-assisted analysis, human review, and audit output.',
      slides: this.paymentCopilotSlides,
    },
    {
      id: 'atlas-capital-intelligence',
      title: 'Atlas Capital Intelligence',
      summary: 'An implemented portfolio-analysis frontend; Alpaca retrieval, caching, and chatbot integration remain planned.',
      slides: this.atlasCapitalIntelligenceSlides,
    },
  ];
}
