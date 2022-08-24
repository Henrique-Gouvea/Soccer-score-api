import { GoalsMatches } from '../interfaces/Matches/Matches';
import HandleError from '../interfaces/Error/handleError';
import Matches from '../database/models/matches';
import { IMatcheservice } from '../interfaces/Matches/MatchesService';

export default class MatchesService implements IMatcheservice<Matches> {
  constructor(private modelMatches = Matches) {
    this.modelMatches = modelMatches;
  }

  async getAll() : Promise<Matches[]> {
    const matches: Matches[] = await this.modelMatches.findAll();
    return matches;
  }

  async getById(id: number): Promise<Matches > {
    const match = await this.modelMatches.findOne({ where: { id } });
    if (!match) throw new HandleError('NotFound', 'Not Found');
    return match;
  }

  async getByProgress(inProgress:boolean): Promise<Matches[]> {
    const matchs = await this.modelMatches.findAll({ where: { inProgress } });
    return matchs;
  }

  async updateProgress(id: number, finish: boolean): Promise<void> {
    await this.modelMatches.update({ inProgress: finish }, { where: { id } });
  }

  async updateGoals(id: number, data: GoalsMatches): Promise<void> {
    await this.modelMatches.update({ ...data }, { where: { id } });
  }
}