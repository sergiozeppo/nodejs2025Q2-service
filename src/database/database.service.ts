import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserDto } from '../users/create-user.dto';
import { UpdatePasswordDto } from '../users/update-password.dto';
import { CreateAlbumDto } from '../albums/create-album.dto';
import { AlbumResponseDto } from '../albums/album-response.dto';
import { CreateArtistDto } from 'src/artists/create-artist.dto';
import { ArtistResponseDto } from 'src/artists/artist-response.dto';
import { CreateTrackDto } from 'src/tracks/create-track.dto';
import { TrackResponseDto } from 'src/tracks/tracks-response.dto';

import { User } from '../users/users.entity';
import { Album } from '../albums/albums.entity';
import { Artist } from '../artists/artists.entity';
import { Track } from '../tracks/tracks.entity';
import { Favorites } from '../favorites/favorites.entity';

@Injectable()
export class DatabaseService {
  constructor(
    @InjectRepository(User) private users: Repository<User>,
    @InjectRepository(Album) private albums: Repository<Album>,
    @InjectRepository(Artist) private artists: Repository<Artist>,
    @InjectRepository(Track) private tracks: Repository<Track>,
    @InjectRepository(Favorites) private favorites: Repository<Favorites>,
  ) {}

  async getUsers() {
    return this.users.find();
  }

  async getUserById(id: string) {
    return this.users.findOneBy({ id });
  }

  async createUser(dto: CreateUserDto) {
    const now = Date.now();
    return this.users.save({
      login: dto.login,
      password: dto.password,
      version: 1,
      createdAt: now,
      updatedAt: now,
    });
  }

  async updateUser(id: string, dto: UpdatePasswordDto) {
    const user = await this.getUserById(id);
    if (!user) return undefined;
    if (user.password !== dto.oldPassword) return null;

    await this.users.update(id, {
      password: dto.newPassword,
      version: user.version + 1,
      updatedAt: Date.now(),
    });

    return this.getUserById(id);
  }

  async deleteUser(id: string) {
    const user = await this.getUserById(id);
    if (!user) return false;
    await this.users.delete(id);
    return true;
  }

  async getArtists() {
    return this.artists.find();
  }

  async getArtistById(id: string) {
    return this.artists.findOneBy({ id });
  }

  async createArtist(dto: CreateArtistDto) {
    return this.artists.save({ name: dto.name, grammy: dto.grammy });
  }

  async updateArtist(id: string, dto: ArtistResponseDto) {
    const artist = await this.getArtistById(id);
    if (!artist) return undefined;

    if (dto.name !== undefined)
      await this.artists.update(id, { name: dto.name });
    if (dto.grammy !== undefined)
      await this.artists.update(id, { grammy: dto.grammy });

    return this.getArtistById(id);
  }

  async deleteArtist(id: string) {
    const artist = await this.getArtistById(id);
    if (!artist) return false;

    await this.artists.delete(id);

    const allTracks = await this.tracks.find();
    const allAlbums = await this.albums.find();
    const favorites = await this.favorites.find();

    await Promise.all(
      allTracks.map((t) =>
        t.artistId === id ? this.tracks.update(t.id, { artistId: null }) : null,
      ),
    );

    await Promise.all(
      allAlbums.map((a) =>
        a.artistId === id ? this.albums.update(a.id, { artistId: null }) : null,
      ),
    );

    if (favorites.length) {
      const updated = favorites[0].artists.filter((aId) => aId !== id);
      await this.favorites.update(1, { artists: updated });
    }

    return true;
  }

  async getAllAlbums() {
    return this.albums.find();
  }

  async getAlbumById(id: string) {
    return this.albums.findOneBy({ id });
  }

  async createAlbum(dto: CreateAlbumDto) {
    return this.albums.save(dto);
  }

  async updateAlbum(id: string, dto: AlbumResponseDto) {
    const album = await this.getAlbumById(id);
    if (!album) return undefined;

    if (dto.name !== undefined)
      await this.albums.update(id, { name: dto.name });
    if (dto.year !== undefined)
      await this.albums.update(id, { year: dto.year });
    if (dto.artistId !== undefined)
      await this.albums.update(id, { artistId: dto.artistId });

    return this.getAlbumById(id);
  }

  async deleteAlbum(id: string) {
    const album = await this.getAlbumById(id);
    if (!album) return false;

    await this.albums.delete(id);

    const allTracks = await this.tracks.find();
    await Promise.all(
      allTracks.map((t) =>
        t.albumId === id ? this.tracks.update(t.id, { albumId: null }) : null,
      ),
    );

    const favs = await this.favorites.find();
    if (favs.length)
      await this.favorites.update(1, {
        albums: favs[0].albums.filter((aId) => aId !== id),
      });

    return true;
  }

  async getAllTracks() {
    return this.tracks.find();
  }

  async getTrackById(id: string) {
    return this.tracks.findOneBy({ id });
  }

  async createTrack(dto: CreateTrackDto) {
    return this.tracks.save(dto);
  }

  async updateTrack(id: string, dto: TrackResponseDto) {
    const track = await this.getTrackById(id);
    if (!track) return undefined;

    if (dto.name !== undefined)
      await this.tracks.update(id, { name: dto.name });
    if (dto.artistId !== undefined)
      await this.tracks.update(id, { artistId: dto.artistId });
    if (dto.albumId !== undefined)
      await this.tracks.update(id, { albumId: dto.albumId });
    if (dto.duration !== undefined)
      await this.tracks.update(id, { duration: dto.duration });

    return this.getTrackById(id);
  }

  async deleteTrack(id: string) {
    const track = await this.getTrackById(id);
    if (!track) return false;

    await this.tracks.delete(id);

    const favs = await this.favorites.find();
    if (favs.length)
      await this.favorites.update(1, {
        tracks: favs[0].tracks.filter((tId) => tId !== id),
      });

    return true;
  }

  async getAllFavorites() {
    const favs = await this.favorites.find();
    if (!favs.length) return { artists: [], albums: [], tracks: [] };

    const { artists, albums, tracks } = favs[0];

    const loadedAlbums = await Promise.all(
      albums.filter(Boolean).map((id) => this.albums.findOneBy({ id })),
    );
    const loadedArtists = await Promise.all(
      artists.filter(Boolean).map((id) => this.artists.findOneBy({ id })),
    );
    const loadedTracks = await Promise.all(
      tracks.filter(Boolean).map((id) => this.tracks.findOneBy({ id })),
    );

    return {
      albums: loadedAlbums.filter(Boolean),
      artists: loadedArtists.filter(Boolean),
      tracks: loadedTracks.filter(Boolean),
    };
  }

  async addFavoriteTrack(id: string) {
    const track = await this.getTrackById(id);
    if (!track) throw new NotFoundException(`Track with id ${id} not found`);

    const favs = await this.favorites.find();
    if (!favs.length) await this.favorites.save({ tracks: [id] });
    else
      await this.favorites.update(1, {
        tracks: [...favs[0].tracks, id],
      });
  }

  async deleteFavoriteTrack(id: string) {
    const favs = await this.favorites.find();
    if (!favs.length || !favs[0].tracks.includes(id))
      throw new NotFoundException(`Track with id ${id} not found`);

    await this.favorites.update(1, {
      tracks: favs[0].tracks.filter((tId) => tId !== id),
    });
  }

  async addFavoriteArtist(id: string) {
    const artist = await this.getArtistById(id);
    if (!artist) throw new NotFoundException(`Artist with id ${id} not found`);

    const favs = await this.favorites.find();
    if (!favs.length) await this.favorites.save({ id: 1, artists: [id] });
    else
      await this.favorites.update(1, {
        artists: [...favs[0].artists, id],
      });
  }

  async deleteFavoriteArtist(id: string) {
    const favs = await this.favorites.find();
    if (!favs.length || !favs[0].artists.includes(id))
      throw new NotFoundException(`Artist with id ${id} not found`);

    await this.favorites.update(1, {
      artists: favs[0].artists.filter((aId) => aId !== id),
    });
  }

  async addFavoriteAlbum(id: string) {
    const album = await this.getAlbumById(id);
    if (!album) throw new NotFoundException(`Album with id ${id} not found`);

    const favs = await this.favorites.find();
    if (!favs.length) await this.favorites.save({ id: 1, albums: [id] });
    else
      await this.favorites.update(1, {
        albums: [...favs[0].albums, id],
      });
  }

  async deleteFavoriteAlbum(id: string) {
    const favs = await this.favorites.find();
    if (!favs.length || !favs[0].albums.includes(id))
      throw new NotFoundException(`Album with id ${id} not found`);

    await this.favorites.update(1, {
      albums: favs[0].albums.filter((aId) => aId !== id),
    });
  }
}
